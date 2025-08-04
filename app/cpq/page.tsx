// components/CPQConfigurator.tsx
'use client';

import React, { useState } from 'react';
import { Switch, Dialog } from '@headlessui/react';
import { initialCPQComponents, CPQComponent} from '../cpq-demo/models';

export default function CPQConfigurator() {
  const [components, setComponents] = useState<CPQComponent[]>(initialCPQComponents);
  const [isManagerView, setIsManagerView] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [receiptText, setReceiptText] = useState<string>('');

  const updateQuantity = (id: string, quantity: number) => {
    setComponents((prev) =>
      prev.map((comp) => (comp.id === id ? { ...comp, quantity: Math.max(0, quantity) } : comp))
    );
  };

  const toggleComponent = (id: string) => {
    setComponents((prev) =>
      prev.map((comp) => (comp.id === id ? { ...comp, quantity: comp.quantity > 0 ? 0 : 1 } : comp))
    );
  };

  const updatePrice = (id: string, price: number) => {
    setComponents((prev) =>
      prev.map((comp) => (comp.id === id ? { ...comp, unitPrice: Math.max(0, price) } : comp))
    );
  };

  const totalPrice = components.reduce((sum, comp) => sum + comp.unitPrice * comp.quantity, 0);

  const openReceiptModal = () => {
    const selectedItems = components.filter((c) => c.quantity > 0);
    let receipt = `Thank you for using this CPQ demo on my site!\n\n`;
    receipt += `You have configured the following items:\n\n`;

    selectedItems.forEach((item) => {
      const lineTotal = (item.unitPrice * item.quantity).toFixed(2);
      receipt += `• ${item.name}: ${item.quantity} × \$${item.unitPrice.toFixed(
        2
      )} = \$${lineTotal}\n`;
    });

    receipt += `\nTotal Demo Amount: \$${totalPrice.toFixed(2)}\n\n`;
    receipt += `Here’s what you just experienced:\n`;
    receipt += `• Live pricing updates as you adjusted quantities or toggled optional items.\n`;
    receipt += `• Inline editing of unit prices in Manager View (toggle at top-right).\n`;
    receipt += `• Inclusion/exclusion checkboxes to select exactly which components you need.\n`;
    receipt += `• A single‐row layout that shrinks on mobile to keep everything visible.\n\n`;
    receipt += `This receipt has been generated dynamically based on your selections. `;
    receipt += `I appreciate you exploring how my CPQ tool can produce detailed quotes on the fly, `;
    receipt += `demonstrating both configurator flexibility and polished UX.\n\n`;
    receipt += `— Thank you for trying out my demo!`;

    setReceiptText(receipt);
    setIsModalOpen(true);
  };

  return (
    <>
      <header className="mb-6 flex flex-col items-start justify-between gap-4 container p-4">
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            CPQ Tool <span className="text-[#05c8fb]">Demo</span>
          </h2>
          <p className="mt-1 text-gray-300 text-xs sm:text-sm">
            Learn how this configurator turns your legacy code into a revenue stream—by
            auto‐generating live quotes, enabling dynamic price adjustments, and seamlessly toggling
            feature components to package and sell historical code.
          </p>

          <details className="mt-2 text-gray-400 text-xs sm:text-sm [&_summary]:cursor-pointer [&_summary]:text-[#05c8fb]">
            <summary className="mt-1 inline-block">Read more</summary>
            <div className="mt-2 space-y-2">
              <p>
                CPQ stands for Configure–Price–Quote. Its a system that allows customers or internal
                teams to build tailored product/service bundles, adjust pricing in real time, and
                generate quotes instantly.
              </p>
              <p>
                In this developer-focused version, each software asset—like a code snippet, PDF,
                image, or repo—is a monetizable component. Devs can mix and match what they offer
                per engagement.
              </p>
              <p>You can use CPQ to:</p>
              <ul className="list-disc list-inside pl-4">
                <li>Gate access to your intellectual property</li>
                <li>Create tiered product bundles (e.g. Docs + Demo Video + Support)</li>
                <li>Build custom paywall workflows using Stripe or Supabase Auth</li>
                <li>Allow users to configure exactly what they need and pay accordingly</li>
              </ul>

              <p>
                For freelancers and SaaS builders, CPQ unlocks recurring income streams from past
                projects by packaging reusable work with minimal overhead. It also enforces
                boundaries, clarity, and automation.
              </p>
            </div>
          </details>
        </div>
      </header>
      <div className="bg-white/5 border border-white/10 p-4 sm:p-6 rounded-xl mx-auto container max-w-[640px]">
        {/* Header */}

        <div className="flex items-center gap-2">
          <span className="text-xl text-gray-400">
            {isManagerView ? 'Manager View' : 'Customer View'}
          </span>
          <Switch
            checked={isManagerView}
            onChange={setIsManagerView}
            className={`${
              isManagerView ? 'bg-[#05c8fb]' : 'bg-gray-400/40'
            } relative inline-flex h-5 w-10 items-center rounded-full transition-colors focus:outline-none`}
          >
            <span className="sr-only">Toggle View</span>
            <span
              className={`${
                isManagerView ? 'translate-x-5' : 'translate-x-0.5'
              } inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform`}
            />
          </Switch>
        </div>

        <div className="w-full mt-3 pb-6">
          <p className="text-gray-300 text-xs sm:text-sm">
            {isManagerView
              ? 'Edit unit prices, toggle component availability, and set default quantities for a curated quote setup.'
              : 'Select which components you need and specify quantities to see live pricing and generate a personalized quote.'}
          </p>
        </div>

        {/* Table Header */}
        <div className="flex text-gray-300 text-[10px] sm:text-xs uppercase tracking-wide mb-2 border-b border-white/20 pb-1">
          <div className="flex-[2] px-1 sm:px-2">Component</div>
          <div className="flex-[1] text-center px-1 sm:px-2">Unit Price</div>
          <div className="flex-[1] text-center px-1 sm:px-2">Include</div>
          <div className="flex-[1] text-center px-1 sm:px-2">Quantity</div>
        </div>

        {/* Component Rows */}
        <div className="divide-y divide-white/20">
          {components.map((comp) => (
            <div key={comp.id} className="flex items-center py-2 text-white text-[11px] sm:text-sm">
              {/* Name & Icon */}
              <div className="flex-[2] flex items-center gap-1 sm:gap-2 px-1 sm:px-2">
                <comp.Icon className="text-[#05c8fb] w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                <div className="flex flex-col">
                  <span className="font-medium">{comp.name}</span>
                  <span className="text-gray-400 text-[9px] sm:text-xs">{comp.unit}</span>
                </div>
              </div>

              {/* Unit Price */}
              <div className="flex-[1] flex justify-center px-1 sm:px-2">
                {isManagerView ? (
                  <input
                    type="number"
                    min={0}
                    step={1}
                    value={comp.unitPrice}
                    onChange={(e) => updatePrice(comp.id, parseFloat(e.target.value) || 0)}
                    className="w-12 sm:w-16 bg-gray-700/50 border border-gray-600 text-white rounded px-1 py-[2px] text-[10px] sm:text-xs focus:outline-none"
                  />
                ) : (
                  <span className="text-[#05c8fb] text-[11px] sm:text-sm">
                    ${comp.unitPrice.toFixed(2)}
                  </span>
                )}
              </div>

              {/* Include Checkbox */}
              <div className="flex-[1] flex justify-center px-1 sm:px-2">
                {comp.optional || isManagerView ? (
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={comp.quantity > 0}
                      onChange={() => toggleComponent(comp.id)}
                      className="h-4 w-4 sm:h-5 sm:w-5 text-[#05c8fb] bg-gray-700/50 border border-gray-600 rounded focus:ring-[#05c8fb]"
                    />
                  </label>
                ) : (
                  <span className="opacity-50">—</span>
                )}
              </div>

              {/* Quantity Input */}
              <div className="flex-[1] flex justify-center px-1 sm:px-2">
                {comp.quantity > 0 ? (
                  <input
                    type="number"
                    min={1}
                    value={comp.quantity}
                    onChange={(e) => updateQuantity(comp.id, parseInt(e.target.value) || 1)}
                    className="w-12 sm:w-16 bg-gray-700/50 border border-gray-600 text-white rounded px-1 py-[2px] text-[10px] sm:text-xs focus:outline-none"
                  />
                ) : (
                  <span className="opacity-50">—</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Total & Generate Quote */}
        <div className="mt-4 flex flex-col sm:flex-row items-center sm:justify-between gap-2 pt-2 border-t border-white/20">
          <div className="text-white font-semibold text-[14px] sm:text-lg">
            Total: <span className="text-green-400">${totalPrice.toFixed(2)}</span>
          </div>

          {!isManagerView && (
            <button
              className="bg-[#05c8fb] text-[#0b253f] text-[12px] sm:text-base font-semibold rounded-full px-6 sm:px-7 py-2 shadow transition hover:bg-[#05c8fb]/90"
              onClick={openReceiptModal}
            >
              Generate Quote
            </button>
          )}
        </div>
      </div>

      {/* Receipt Modal */}
      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="fixed inset-0 z-50 overflow-y-auto"
      >
        <div className="flex min-h-screen items-center justify-center p-4">
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/50" />

          {/* Modal Panel */}
          <div className="relative bg-gray-900 rounded-lg max-w-lg w-full p-6 mx-auto text-white">
            <Dialog.Title className="text-xl font-bold mb-4">CPQ Demo Receipt</Dialog.Title>
            <div className="whitespace-pre-wrap text-sm max-h-80 overflow-y-auto">
              {receiptText}
            </div>
            <button
              className="mt-6 bg-[#05c8fb] hover:bg-[#0bbfff] text-gray-900 font-semibold rounded-md px-4 py-2 transition focus:outline-none"
              onClick={() => setIsModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      </Dialog>
    </>
  );
}
