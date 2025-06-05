// lib/cpqData.ts

export type CPQComponent = {
  id: string;
  name: string;
  unit: string;
  unitPrice: number;
  quantity: number;
  optional: boolean;
};

export const initialCPQComponents: CPQComponent[] = [
  { id: 'snippet', name: 'Code Snippet', unit: 'snippet', unitPrice: 15, quantity: 1, optional: false },
  { id: 'readme', name: 'Instructions (README)', unit: 'document', unitPrice: 10, quantity: 1, optional: false },
  { id: 'guide', name: 'Setup Guide', unit: 'document', unitPrice: 20, quantity: 1, optional: false },
  { id: 'repo', name: 'Temporary Repo Access', unit: '7-days', unitPrice: 25, quantity: 1, optional: false },
  { id: 'troubleshoot', name: 'Troubleshooting Guide', unit: 'document', unitPrice: 10, quantity: 0, optional: true },
  { id: 'data', name: 'Sample Data', unit: 'dataset', unitPrice: 5, quantity: 0, optional: true },
];
