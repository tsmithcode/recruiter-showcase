'use client';

import React, { useState } from 'react';
import { useCpqController } from './useCpqController';
import CPQHeader from './components/CPQHeader';
import ManagerControls from './components/ManagerControls';
import ComponentTableHeader from './components/ComponentTableHeader';
import ComponentRow from './components/ComponentRow';
import ComponentEditModal from './components/ComponentEditModal';
import TotalFooter from './components/TotalFooter';
import QuoteModal from './components/QuoteModal';
import CPQUserGuideDialog from '../cpq-demo/components/CPQUserGuideDialog';
import RecruiterLink from '@/components/showcase/RecruiterLink';
import { CpqScenarioId, cpqScenarios } from '@/lib/cpqProof';
import { recordRecruiterEvent } from '@/lib/telemetry';

// --- Import your dataset arrays ---
import {
  aerospaceComponents,
  automotiveComponents,
  bankingComponents,
  biotechComponents,
  constructionComponents,
  energyComponents,
  etoCadComponents,
  filmComponents,
  medicalComponents,
  musicAlbumComponents,
  realEstateComponents,
  softwareSalesComponents,
  CPQComponent
} from '../cpq-demo/models'; // adjust to your actual path

const datasetsMap: Record<CpqScenarioId, CPQComponent[]> = {
  aerospace: aerospaceComponents,
  automotive: automotiveComponents,
  banking: bankingComponents,
  biotech: biotechComponents,
  construction: constructionComponents,
  energy: energyComponents,
  etoCad: etoCadComponents,
  film: filmComponents,
  medical: medicalComponents,
  music: musicAlbumComponents,
  realEstate: realEstateComponents,
  software: softwareSalesComponents,
};

export default function CPQAdvanced() {
  const [selectedDataset, setSelectedDataset] = useState<CpqScenarioId>('software');
  const controller = useCpqController(datasetsMap[selectedDataset]);
  const [mode, setMode] = useState<'customer' | 'manager'>('customer');

  const handleLoadSeedData = (dataset: string) => {
    const typedDataset = dataset as CpqScenarioId;
    const data = datasetsMap[typedDataset] || [];
    controller.setComponents(data);
    setSelectedDataset(typedDataset);
    recordRecruiterEvent('cpq_scenario_loaded', { dataset: typedDataset });
  };

  const scenario = cpqScenarios[selectedDataset];

  return (
    <main className="showcase-shell space-y-8 pb-20 pt-12">
      <section className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-5">
          <p className="showcase-eyebrow">Interactive proof artifact</p>
          <h1 className="text-4xl font-semibold tracking-[-0.05em] text-white sm:text-6xl">
            CPQ decision workbench
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-slate-300">
            This is not presented as a fake enterprise app. It is a transparent systems artifact:
            a visible pricing engine, role-aware interface, dataset-driven scenarios, and a small
            proof surface for how commercial logic becomes operator software.
          </p>
          <div className="flex flex-wrap gap-4">
            <RecruiterLink
              href="/tracks/openai"
              className="inline-flex items-center rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-teal-200"
            >
              See how this supports the OpenAI track
            </RecruiterLink>
            <RecruiterLink
              href="/tracks/construction"
              className="inline-flex items-center rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-teal-300 hover:text-teal-200"
            >
              See how this supports the construction track
            </RecruiterLink>
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8">
          <p className="showcase-eyebrow">What this demo proves</p>
          <ul className="mt-5 space-y-4 text-sm leading-7 text-slate-300">
            <li className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-300" />
              <span>Pricing logic is explicit enough for a recruiter to inspect in one pass.</span>
            </li>
            <li className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-300" />
              <span>Scenario data is portable across industries without changing the core engine.</span>
            </li>
            <li className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-300" />
              <span>Customer and manager modes separate consumption from commercial control.</span>
            </li>
            <li className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-300" />
              <span>Production evolution is visible: approvals, persistence, and downstream sync.</span>
            </li>
          </ul>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8">
          <p className="showcase-eyebrow">Scenario brief</p>
          <h2 className="mt-4 text-2xl font-semibold text-white">{scenario.headline}</h2>
          <p className="mt-3 text-sm leading-7 text-slate-300">{scenario.summary}</p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Operator</p>
              <p className="mt-2 text-sm text-slate-200">{scenario.operator}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Buyer</p>
              <p className="mt-2 text-sm text-slate-200">{scenario.buyer}</p>
            </div>
          </div>

          <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-[#091120] p-5">
            <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Pricing logic</p>
            <p className="mt-3 text-sm leading-7 text-slate-300">{scenario.pricingLogic}</p>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
            <p className="showcase-eyebrow">Workflow states</p>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
              {scenario.workflowStates.map((state) => (
                <li key={state} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-300" />
                  <span>{state}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
            <p className="showcase-eyebrow">Production extension points</p>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
              {scenario.extensionPoints.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-violet-300" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-4 sm:p-6">
        <CPQUserGuideDialog />

        <CPQHeader onModeChange={setMode} />

        <ManagerControls
          onAddComponent={controller.addComponent}
          onClearAll={controller.clearAll}
          onLoadSeedData={handleLoadSeedData}
          selectedDataset={selectedDataset}
          onSelectDataset={(dataset) => setSelectedDataset(dataset as CpqScenarioId)}
        />

        <div className="mb-5 grid gap-4 rounded-[1.5rem] border border-white/10 bg-[#091120]/90 p-5 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Current scenario</p>
            <p className="mt-2 text-lg font-semibold text-white">{scenario.name}</p>
            <p className="mt-2 text-sm leading-7 text-slate-300">
              {scenario.summary}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Production notes</p>
            <ul className="mt-2 space-y-2 text-sm leading-6 text-slate-300">
              {scenario.productionNotes.map((note) => (
                <li key={note} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-300" />
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <ComponentTableHeader mode={mode} />

        <div className="divide-y divide-white/20">
          {controller.components.map((c) => (
            <ComponentRow
              key={c.id}
              component={c}
              openEditModal={controller.openEditModal}
              toggleInclude={controller.toggleInclude}
              updateComponent={controller.updateComponent}
              removeComponent={controller.removeComponent}
              mode={mode}
            />
          ))}
        </div>

        <TotalFooter
          components={controller.components}
          onOpenQuote={() => {
            recordRecruiterEvent('cpq_quote_generated', { dataset: selectedDataset, mode });
            controller.openReceiptModal();
          }}
        />

        <QuoteModal
          isOpen={controller.isQuoteOpen}
          receiptText={controller.receiptText}
          onClose={controller.closeReceiptModal}
        />
      </div>

      {controller.editingComponent && (
        <ComponentEditModal
          component={controller.editingComponent}
          onClose={controller.closeEditModal}
          onUpdate={controller.updateComponent}
          onDelete={controller.removeComponent}
        />
      )}
    </main>
  );
}
