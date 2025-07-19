// Step 1: Define shared types, icons, and data
// File: app/cpq-demo/models.ts

import {
  FaCode, FaFileAlt, FaFilePdf, FaImage, FaVideo, FaGithub, FaInfoCircle,
  FaDatabase, FaTools, FaBookOpen, FaQuestionCircle, FaStar,
  FaLaptopCode, FaCogs, FaCloud, FaNetworkWired,
} from 'react-icons/fa';

export type CPQComponent = {
  id: string;
  name: string;
  unit: string;
  unitLaborCost: number;
  laborHours: number;
  unitMaterialCost: number;
  quantity: number;
  optional: boolean;
  Icon: React.ComponentType<{ className?: string }>;
};

export const iconOptions = [
  { id: 'FaCode', label: 'Code Snippet', Icon: FaCode },
  { id: 'FaFileAlt', label: 'README', Icon: FaFileAlt },
  { id: 'FaFilePdf', label: 'PDF Guide', Icon: FaFilePdf },
  { id: 'FaImage', label: 'Image', Icon: FaImage },
  { id: 'FaVideo', label: 'Video', Icon: FaVideo },
  { id: 'FaGithub', label: 'Repo Access', Icon: FaGithub },
  { id: 'FaInfoCircle', label: 'Description', Icon: FaInfoCircle },
  { id: 'FaDatabase', label: 'Sample Data', Icon: FaDatabase },
  { id: 'FaTools', label: 'Troubleshoot', Icon: FaTools },
  { id: 'FaBookOpen', label: 'Case Study', Icon: FaBookOpen },
  { id: 'FaQuestionCircle', label: 'FAQ', Icon: FaQuestionCircle },
  { id: 'FaStar', label: 'Testimonial', Icon: FaStar },
  { id: 'FaLaptopCode', label: 'Custom .NET', Icon: FaLaptopCode },
  { id: 'FaCogs', label: 'CAD/Automation', Icon: FaCogs },
  { id: 'FaCloud', label: 'Cloud/DevOps', Icon: FaCloud },
  { id: 'FaNetworkWired', label: 'Data/ERP', Icon: FaNetworkWired },
];

export const initialCPQComponents: CPQComponent[] = [
  { id: 'snippet', name: 'Code Snippet', unit: 'per snippet', unitLaborCost: 50, laborHours: 1, unitMaterialCost: 0, quantity: 1, optional: false, Icon: FaCode },
  { id: 'readme', name: 'Instructions (README)', unit: 'per document', unitLaborCost: 40, laborHours: 1.5, unitMaterialCost: 0, quantity: 1, optional: false, Icon: FaFileAlt },
  { id: 'guide', name: 'Setup Guide (PDF)', unit: 'per guide', unitLaborCost: 60, laborHours: 2, unitMaterialCost: 5, quantity: 1, optional: false, Icon: FaFilePdf },
  { id: 'productImage', name: 'Product Image', unit: 'per image', unitLaborCost: 30, laborHours: 0.5, unitMaterialCost: 0, quantity: 1, optional: false, Icon: FaImage },
  { id: 'previewVideo', name: 'Preview Video', unit: 'per video', unitLaborCost: 80, laborHours: 1, unitMaterialCost: 0, quantity: 1, optional: false, Icon: FaVideo },
  { id: 'repo', name: 'Temporary Repo Access', unit: '7-day access', unitLaborCost: 0, laborHours: 0, unitMaterialCost: 25, quantity: 1, optional: false, Icon: FaGithub },
  { id: 'productDesc', name: 'Product Description', unit: 'per product', unitLaborCost: 45, laborHours: 1, unitMaterialCost: 0, quantity: 1, optional: false, Icon: FaInfoCircle },
  { id: 'sampleData', name: 'Sample Data', unit: 'per dataset', unitLaborCost: 35, laborHours: 1, unitMaterialCost: 5, quantity: 0, optional: true, Icon: FaDatabase },
  { id: 'troubleshoot', name: 'Troubleshooting Guide', unit: 'per guide', unitLaborCost: 45, laborHours: 1, unitMaterialCost: 0, quantity: 0, optional: true, Icon: FaTools },
  { id: 'caseStudy', name: 'Case Study', unit: 'per document', unitLaborCost: 60, laborHours: 2, unitMaterialCost: 0, quantity: 0, optional: true, Icon: FaBookOpen },
  { id: 'faq', name: 'FAQ Document', unit: 'per document', unitLaborCost: 30, laborHours: 1, unitMaterialCost: 0, quantity: 0, optional: true, Icon: FaQuestionCircle },
  { id: 'testimonial', name: 'Testimonial', unit: 'per testimonial', unitLaborCost: 20, laborHours: 0.5, unitMaterialCost: 0, quantity: 0, optional: true, Icon: FaStar },
];
