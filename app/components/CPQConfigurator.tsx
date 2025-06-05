// components/CPQConfigurator.tsx
"use client";

import React, { useState } from 'react';
import { Switch, Dialog } from '@headlessui/react';
import { motion } from 'framer-motion';
import {
  FaCode,
  FaFileAlt,
  FaFilePdf,
  FaImage,
  FaVideo,
  FaGithub,
  FaInfoCircle,
  FaDatabase,
  FaTools,
  FaBookOpen,
  FaQuestionCircle,
  FaStar,
} from 'react-icons/fa';

type CPQComponent = {
  id: string;
  name: string;
  unit: string;
  unitPrice: number;
  quantity: number;
  optional: boolean;
  Icon: React.ComponentType<{ className?: string }>;
};

const initialCPQComponents: CPQComponent[] = [
  {
    id: 'snippet',
    name: 'Code Snippet',
    unit: 'per snippet',
    unitPrice: 10,
    quantity: 1,
    optional: false,
    Icon: FaCode,
  },
  {
    id: 'readme',
    name: 'Instructions (README)',
    unit: 'per document',
    unitPrice: 15,
    quantity: 1,
    optional: false,
    Icon: FaFileAlt,
  },
  {
    id: 'guide',
    name: 'Setup Guide (PDF)',
    unit: 'per guide',
    unitPrice: 20,
    quantity: 1,
    optional: false,
    Icon: FaFilePdf,
  },
  {
    id: 'productImage',
    name: 'Product Image',
    unit: 'per image',
    unitPrice: 0,
    quantity: 1,
    optional: false,
    Icon: FaImage,
  },
  {
    id: 'previewVideo',
    name: 'Preview Video',
    unit: 'per video',
    unitPrice: 0,
    quantity: 1,
    optional: false,
    Icon: FaVideo,
  },
  {
    id: 'repo',
    name: 'Temporary Repo Access',
    unit: '7-day access',
    unitPrice: 25,
    quantity: 1,
    optional: false,
    Icon: FaGithub,
  },
  {
    id: 'productDesc',
    name: 'Product Description',
    unit: 'per product',
    unitPrice: 0,
    quantity: 1,
    optional: false,
    Icon: FaInfoCircle,
  },
  {
    id: 'sampleData',
    name: 'Sample Data',
    unit: 'per dataset',
    unitPrice: 5,
    quantity: 0,
    optional: true,
    Icon: FaDatabase,
  },
  {
    id: 'troubleshoot',
    name: 'Troubleshooting Guide',
    unit: 'per guide',
    unitPrice: 10,
    quantity: 0,
    optional: true,
    Icon: FaTools,
  },
  {
    id: 'caseStudy',
    name: 'Case Study',
    unit: 'per document',
    unitPrice: 20,
    quantity: 0,
    optional: true,
    Icon: FaBookOpen,
  },
  {
    id: 'faq',
    name: 'FAQ Document',
    unit: 'per document',
    unitPrice: 0,
    quantity: 0,
    optional: true,
    Icon: FaQuestionCircle,
  },
  {
    id: 'testimonial',
    name: 'Testimonial',
    unit: 'per testimonial',
    unitPrice: 0,
    quantity: 0,
    optional: true,
    Icon: FaStar,
  },
];

export default function CPQConfigurator() {
  const [components, setComponents] = useState<CPQComponent[]>(initialCPQComponents);
  const [isManagerView, setIsManagerView] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [receiptText, setReceiptText] = useState<string>("");

  const updateQuantity = (id: string, quantity: number) => {
    setComponents(prev =>
      prev.map(comp =>
        comp.id === id ? { ...comp, quantity: Math.max(0, quantity) } : comp
      )
    );
  };

  const toggleComponent = (id: string) => {
    setComponents(prev =>
      prev.map(comp =>
        comp.id === id
          ? { ...comp, quantity: comp.quantity > 0 ? 0 : 1 }
          : comp
      )
    );
  };

  const updatePrice = (id: string, price: number) => {
    setComponents(prev =>
      prev.map(comp =>
        comp.id === id ? { ...comp, unitPrice: Math.max(0, price) } : comp
      )
    );
  };

  const totalPrice = components.reduce(
    (sum, comp) => sum + comp.unitPrice * comp.quantity,
    0
  );

  const openReceiptModal = () => {
    const selectedItems = components.filter(c => c.quantity > 0);

    let receipt = `Thank you for using this CPQ demo on my site!\n\n`;
    receipt += `You have configured the following items:\n\n`;

    selectedItems.forEach(item => {
      const lineTotal = (item.unitPrice * item.quantity).toFixed(2);
      receipt += `• ${item.name}: ${item.quantity} × \$${item.unitPrice.toFixed(2)} = \$${lineTotal}\n`;
    });

    receipt += `\nTotal Demo Amount: \$${totalPrice.toFixed(2)}\n\n`;

    receipt += `Here’s what you just experienced:\n`;
    receipt += `• Live pricing updates as you adjusted quantities or toggled optional items.\n`;
    receipt += `• Inline editing of unit prices in Manager View (toggle at top-right).\n`;
    receipt += `• Inclusion/exclusion checkboxes to select exactly which components you need.\n`;
    receipt += `• A compact, single-row layout that fits all data without excessive scrolling.\n\n`;
    receipt += `This receipt has been generated dynamically based on your selections. `;
    receipt += `I appreciate you exploring how my CPQ tool can produce detailed quotes on the fly, `;
    receipt += `demonstrating both configurator flexibility and polished UX.\n\n`;
    receipt += `— Thank you for trying out my demo!`;

    setReceiptText(receipt);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="bg-gray-800/70 p-4 sm:p-6 rounded-xl max-w-full mx-auto">
        <header className="mb-8 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
  {/* Left: Demo Title & Tagline */}
  <div>
    <h2 className="text-3xl sm:text-4xl font-bold text-white">
      CPQ Tool <span className="text-[#05c8fb]">Demo</span>
    </h2>
    <p className="mt-1 text-gray-300 text-sm sm:text-base">
      Explore how this configurator generates live quotes, edits prices, and toggles components seamlessly.
    </p>
  </div>

  {/* Right: Current Mode Label & Single Toggle */}
  <div className="flex items-center gap-2">
    <span className="text-base text-gray-400">
      {isManagerView ? 'Manager CPQ View' : 'Customer CPQ View'}
    </span>
    <Switch
      checked={isManagerView}
      onChange={setIsManagerView}
      className={`${
        isManagerView ? 'bg-[#05c8fb]' : 'bg-gray-400/40'
      } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none`}
    >
      <span className="sr-only">Toggle View</span>
      <span
        className={`${
          isManagerView ? 'translate-x-6' : 'translate-x-1'
        } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
      />
    </Switch>
  </div>

  {/* Below header: Mode-specific description */}
  <div className="w-full mt-4 sm:mt-0">
    <p className="text-gray-300 text-sm sm:text-base">
      {isManagerView
        ? 'Edit unit prices, toggle component availability, and set default quantities for a curated quote setup.'
        : 'Select which components you need and specify quantities to see live pricing and generate a personalized quote.'}
    </p>
  </div>
</header>


        {/* Horizontal Scroll Container */}
        <div className="overflow-x-auto">
          {/* Table Header */}
          <div className="flex min-w-max text-gray-300 text-xs uppercase tracking-wide mb-2 border-b border-white/20 pb-1">
            <div className="flex-2 px-2">Component</div>
            <div className="w-24 flex-shrink-0 text-center">Unit Price</div>
            <div className="w-16 flex-shrink-0 text-center">Include</div>
            <div className="w-16 flex-shrink-0 text-center">Quantity</div>
          </div>

          {/* Component Rows */}
          <div className="divide-y divide-white/20">
            {components.map((comp, idx) => (
              <motion.div
                key={comp.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: idx * 0.05 }}
                className="flex min-w-max items-center py-2 text-white text-sm"
              >
                {/* Name & Icon */}
                <div className="flex-2 flex items-center gap-2 px-2">
                  <comp.Icon className="text-[#05c8fb] w-4 h-4 flex-shrink-0" />
                  <div className="flex flex-col">
                    <span className="font-medium">{comp.name}</span>
                    <span className="text-gray-400 text-xs">{comp.unit}</span>
                  </div>
                </div>

                {/* Unit Price */}
                <div className="w-24 flex-shrink-0 flex justify-center px-2">
                  {isManagerView ? (
                    <input
                      type="number"
                      min={0}
                      step={1}
                      value={comp.unitPrice}
                      onChange={e =>
                        updatePrice(comp.id, parseFloat(e.target.value) || 0)
                      }
                      className="w-20 bg-gray-700/50 border border-gray-600 text-white rounded px-1 py-1 text-xs focus:outline-none"
                    />
                  ) : (
                    <span className="text-[#05c8fb]">
                      ${comp.unitPrice.toFixed(2)}
                    </span>
                  )}
                </div>

                {/* Include Checkbox */}
                <div className="w-16 flex-shrink-0 flex justify-center px-2">
                  {(comp.optional || isManagerView) ? (
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={comp.quantity > 0}
                        onChange={() => toggleComponent(comp.id)}
                        className="h-4 w-4 text-[#05c8fb] bg-gray-700/50 border border-gray-600 rounded focus:ring-[#05c8fb]"
                      />
                    </label>
                  ) : (
                    <span className="opacity-50">—</span>
                  )}
                </div>

                {/* Quantity Input */}
                <div className="w-16 flex-shrink-0 flex justify-center px-2">
                  {comp.quantity > 0 ? (
                    <input
                      type="number"
                      min={1}
                      value={comp.quantity}
                      onChange={e =>
                        updateQuantity(comp.id, parseInt(e.target.value) || 1)
                      }
                      className="w-14 bg-gray-700/50 border border-gray-600 text-white rounded px-1 py-1 text-xs focus:outline-none"
                    />
                  ) : (
                    <span className="opacity-50">—</span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Total & Checkout */}
        <div className="mt-4 flex flex-col sm:flex-row items-center sm:justify-between gap-2 pt-2 border-t border-white/20">
          <div className="text-white font-semibold text-lg">
            Total: <span className="text-green-400">${totalPrice.toFixed(2)}</span>
          </div>

          {!isManagerView && (
           <motion.button
  whileHover={{ scale: 1.02 }}
  className="bg-[#05c8fb] text-[#0b253f] font-semibold rounded-full px-7 py-2 shadow transition hover:bg-[#05c8fb]/90"
  onClick={openReceiptModal}
>
  Generate Quote
</motion.button>

          )}
        </div>
      </div>

     {/* Modal for Receipt */}
<Dialog
  open={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  className="fixed inset-0 z-50 overflow-y-auto"
>
  <div className="flex min-h-screen items-center justify-center p-4">
    {/* Backdrop using a plain div instead of Dialog.Overlay */}
    <div className="fixed inset-0 bg-black/50" />

    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      className="relative bg-gray-900 rounded-lg max-w-lg w-full p-6 mx-auto text-white"
    >
      <Dialog.Title className="text-xl font-bold mb-4">
        CPQ Demo Receipt
      </Dialog.Title>
      <div className="whitespace-pre-wrap text-sm max-h-80 overflow-y-auto">
        {receiptText}
      </div>
      <button
        className="mt-6 bg-[#05c8fb] hover:bg-[#0bbfff] text-gray-900 font-semibold rounded-md px-4 py-2 transition focus:outline-none"
        onClick={() => setIsModalOpen(false)}
      >
        Close
      </button>
    </motion.div>
  </div>
</Dialog>
    </>
  );
}
