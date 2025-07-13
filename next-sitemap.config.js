/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://www.tsmithcode.ai", // Replace with your actual domain
  generateRobotsTxt: true, // (optional) Creates a robots.txt file as well
  sitemapSize: 7000, // (optional) Max number of URLs per sitemap file (default is 50000)
  outDir: "./public", // Output directory for the sitemap (must be 'public' for Vercel)
  // Optional: Define additional dynamic paths or exclude paths
  // transform: async (config, path) => {
  //   return {
  //     loc: path, // An absolute URL
  //     changefreq: 'daily',
  //     priority: 0.7,
  //     lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
  //     alternateRefs: [
  //       config.i18n && {
  //         href: `${config.siteUrl}/en${path}`,
  //         hreflang: 'en',
  //       },
  //       config.i18n && {
  //         href: `${config.siteUrl}/es${path}`,
  //         hreflang: 'es',
  //       },
  //     ].filter(Boolean),
  //   }
  // },
  // additionalPaths: async (config) => [
  //   await config.transform(config, '/additional-page'),
  //   await config.transform(config, '/another-additional-page'),
  // ],
  // exclude: ['/private-page', '/old-page/(.*)'], // Exclude paths that should not be in the sitemap
};
