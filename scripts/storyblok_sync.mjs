import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';

const rootDir = process.cwd();

function loadEnvFile(filePath) {
  return fs
    .readFile(filePath, 'utf8')
    .then((contents) => {
      for (const line of contents.split('\n')) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) {
          continue;
        }

        const separatorIndex = trimmed.indexOf('=');
        if (separatorIndex === -1) {
          continue;
        }

        const key = trimmed.slice(0, separatorIndex);
        const value = trimmed.slice(separatorIndex + 1);
        if (!(key in process.env)) {
          process.env[key] = value;
        }
      }
    })
    .catch(() => {
      // Ignore missing env file.
    });
}

await loadEnvFile(path.join(rootDir, '.env.local'));

const managementToken = process.env.STORYBLOK_MANAGEMENT_TOKEN;
const spaceId = process.env.STORYBLOK_SPACE_ID;

if (!managementToken || !spaceId) {
  throw new Error('Missing STORYBLOK_MANAGEMENT_TOKEN or STORYBLOK_SPACE_ID in .env.local');
}

const apiBase = `https://mapi.storyblok.com/v1/spaces/${spaceId}`;

async function readJson(relativePath) {
  const absolutePath = path.join(rootDir, relativePath);
  const contents = await fs.readFile(absolutePath, 'utf8');
  return JSON.parse(contents);
}

async function apiRequest(endpoint, init = {}) {
  const response = await fetch(`${apiBase}${endpoint}`, {
    ...init,
    headers: {
      Authorization: managementToken,
      'Content-Type': 'application/json',
      ...(init.headers ?? {}),
    },
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`${init.method ?? 'GET'} ${endpoint} failed: ${response.status} ${body}`);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

function convertSchemaField(field) {
  const nextField = { ...field };

  if (nextField.type === 'blocks') {
    nextField.type = 'bloks';
  }

  if (nextField.type === 'option' && Array.isArray(nextField.options)) {
    nextField.options = nextField.options.map((option) =>
      typeof option === 'string'
        ? { name: option, value: option }
        : option,
    );
  }

  if (nextField.type === 'text' && nextField.display_name?.includes('multi-line')) {
    nextField.type = 'multilink';
  }

  return nextField;
}

function convertComponentBlueprint(blueprint) {
  const schema = Object.fromEntries(
    Object.entries(blueprint.schema ?? {}).map(([fieldName, fieldValue]) => [
      fieldName,
      convertSchemaField(fieldValue),
    ]),
  );

  return {
    name: blueprint.name,
    display_name: blueprint.display_name ?? null,
    description: blueprint.description ?? null,
    is_root: blueprint.is_root ?? false,
    is_nestable: blueprint.is_nestable ?? true,
    schema,
  };
}

async function syncComponents() {
  const componentPaths = [
    'storyblok/components/cta_block.json',
    'storyblok/components/issue_page.json',
    'storyblok/components/issue_spread.json',
    'storyblok/components/media_asset.json',
    'storyblok/components/proof_artifact.json',
    'storyblok/components/reference_link.json',
    'storyblok/components/trust_block.json',
    'storyblok/components/trust_item.json',
  ];

  const existing = await apiRequest('/components');
  const byName = new Map(existing.components.map((component) => [component.name, component]));

  for (const componentPath of componentPaths) {
    const blueprint = await readJson(componentPath);
    const payload = { component: convertComponentBlueprint(blueprint) };
    const existingComponent = byName.get(blueprint.name);

    if (existingComponent) {
      await apiRequest(`/components/${existingComponent.id}`, {
        method: 'PUT',
        body: JSON.stringify(payload),
      });
      console.log(`Updated component: ${blueprint.name}`);
    } else {
      await apiRequest('/components', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      console.log(`Created component: ${blueprint.name}`);
    }
  }
}

async function syncHomepageStory() {
  const seed = await readJson('storyblok/seed/homepage-issue.json');
  const existingStories = await apiRequest('/stories');
  const existingStory = existingStories.stories.find(
    (story) => story.slug === seed.slug || story.full_slug === seed.slug,
  );

  const normalizeBlock = (block) => ({
    _uid: block._uid ?? crypto.randomUUID().replace(/-/g, ''),
    ...block,
  });

  const normalizedContent = {
    ...seed.content,
    proofArtifact: seed.content.proofArtifact ? [normalizeBlock(seed.content.proofArtifact)] : [],
    trustBlock: seed.content.trustBlock ? [normalizeBlock(seed.content.trustBlock)] : [],
    spreads: Array.isArray(seed.content.spreads)
      ? seed.content.spreads.map((spread) => ({
          ...normalizeBlock(spread),
          actions: Array.isArray(spread.actions) ? spread.actions.map(normalizeBlock) : [],
          references: Array.isArray(spread.references)
            ? spread.references.map(normalizeBlock)
            : [],
          trustItems: Array.isArray(spread.trustItems)
            ? spread.trustItems.map(normalizeBlock)
            : [],
        }))
      : [],
  };

  const storyPayload = {
    story: {
      name: seed.name,
      slug: seed.slug,
      content: normalizedContent,
      is_folder: false,
      content_type: 'issue_page',
    },
  };

  if (existingStory) {
    await apiRequest(`/stories/${existingStory.id}`, {
      method: 'PUT',
      body: JSON.stringify(storyPayload),
    });
    console.log(`Updated story: ${seed.slug}`);
  } else {
    await apiRequest('/stories', {
      method: 'POST',
      body: JSON.stringify(storyPayload),
    });
    console.log(`Created story: ${seed.slug}`);
  }
}

await syncComponents();
await syncHomepageStory();

console.log('Storyblok sync complete.');
