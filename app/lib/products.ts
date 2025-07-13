// lib/products.ts

export const products = [
  {
    id: 'cad-workflow-automation',
    title: 'CAD Workflow Automation',
    description: 'Automate your CAD workflow using advanced .NET scripts.',
    image: '/images/cad-product.png',
    videoLink: 'https://www.youtube.com/embed/placeholder',
    githubRepo: 'https://github.com/yourusername/cad-workflow-automation',
    priceId: 'price_stripe_placeholder',
  },
  {
    id: 'erp-crm-integration',
    title: 'ERP & CRM Integration',
    description: 'Seamlessly integrate your ERP and CRM systems.',
    image: '/images/erp-crm.png',
    videoLink: 'https://www.youtube.com/embed/placeholder',
    githubRepo: 'https://github.com/yourusername/erp-crm-integration',
    priceId: 'price_stripe_placeholder',
  },
  {
    id: 'excel-reporting-tool',
    title: 'Excel Reporting Tool',
    description: 'Generate instant financial reports from Excel data.',
    image: '/images/excel-tool.png',
    videoLink: 'https://www.youtube.com/embed/placeholder',
    githubRepo: 'https://github.com/yourusername/excel-reporting-tool',
    priceId: 'price_stripe_placeholder',
  },
];

export const getProductById = (id: string) => products.find((product) => product.id === id);
