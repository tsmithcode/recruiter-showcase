// File: app/cpq-demo/components/CPQUserGuideDialog.tsx

import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { motion } from 'framer-motion';
import { BookOpenIcon, XMarkIcon } from '@heroicons/react/24/outline';

export default function CPQUserGuideDialog() {
  const [isOpen, setIsOpen] = useState(false);

  const userGuideContent = (
    <div className="prose prose-invert max-w-none text-white p-4 text-sm leading-relaxed">
      <p className="mt-2 text-gray-300">
        The CPQ Advanced application is a powerful tool for rapidly configuring,
        pricing, and generating quotes for complex digital products and services.
        This guide outlines the application&apos;s core features for both user modes.
      </p>

      {/* --- */}
      <div className="my-6 border-t border-white/20" />

      {/* Main Sections */}
      <section>
        <h2 className="text-xl text-white font-semibold mb-3">
          Application Overview
        </h2>
        <ul className="list-disc list-inside space-y-1 ml-4 text-gray-300">
          <li>
            **CPQ Header**: Toggle between **Customer** and **Manager** modes.
          </li>
          <li>
            **Component Table**: The core interface for managing individual quote components.
          </li>
          <li>
            **Total Footer**: Displays aggregate pricing, cost, and profit.
          </li>
          <li>
            **Quote Modal**: Generates a printable quote receipt.
          </li>
        </ul>
      </section>

      {/* --- */}
      <div className="my-6 border-t border-white/20" />

      <section>
        <h2 className="text-xl text-white font-semibold mb-3">
          Customer Mode
        </h2>
        <p className="text-gray-300">
          A simplified view for sales reps or clients to interact with a quote.
        </p>
        <h3 className="text-lg text-[#05c8fb] font-semibold mt-4 mb-2">
          Key Actions
        </h3>
        <ul className="list-disc list-inside space-y-1 ml-4 text-gray-300">
          <li>
            **Include/Exclude**: Use checkboxes to add or remove optional components from the quote.
          </li>
          <li>
            **Adjust Quantity**: Change the number of units for included items.
          </li>
          <li>
            **View Totals**: Monitor real-time price, cost, and profit changes.
          </li>
        </ul>
        <p className="mt-4 font-semibold text-red-400">
          *Note: You cannot add, remove, or edit component details in this mode.*
        </p>
      </section>

      {/* --- */}
      <div className="my-6 border-t border-white/20" />

      <section>
        <h2 className="text-xl text-white font-semibold mb-3">
          Manager Mode
        </h2>
        <p className="text-gray-300">
          Full control for administrators to configure all aspects of a quote.
        </p>
        <h3 className="text-lg text-[#05c8fb] font-semibold mt-4 mb-2">
          Manager Controls
        </h3>
        <ul className="list-disc list-inside space-y-1 ml-4 text-gray-300">
          <li>
            **Load Mock Data**: Replace current components with pre-defined industry datasets.
          </li>
          <li>
            **+ Add Component**: Insert a new, blank component row.
          </li>
          <li>
            **Clear All**: Remove all components from the current quote.
          </li>
          <li>
            **Edit**: Open a modal to modify a component&apos;s details.
          </li>
        </ul>
      </section>

      {/* --- */}
      <div className="my-6 border-t border-white/20" />

      <section>
        <h2 className="text-xl text-white font-semibold mb-3">
          Edit Component Modal
        </h2>
        <p className="text-gray-300">
          This modal provides three sections for detailed component configuration.
        </p>

        <h3 className="text-lg text-[#05c8fb] font-semibold mt-4 mb-2">
          Input Fields
        </h3>
        <ul className="list-disc list-inside space-y-1 ml-4 text-gray-300">
          <li>
            **Details**: Name, Icon, Quantity.
          </li>
          <li>
            **Costs**: Unit Material Cost, Unit Labor Cost, Labor Hours.
          </li>
          <li>
            **Pricing**: Material Markup, Labor Margin, Discount.
          </li>
        </ul>

        <h3 className="text-lg text-[#05c8fb] font-semibold mt-4 mb-2">
          Pricing Summary
        </h3>
        <p className="text-gray-300">
          View real-time calculations for Labor Cost, Material Cost, Subtotal, Unit Price, Profit, and Profit Percentage.
        </p>

        <h3 className="text-lg text-[#05c8fb] font-semibold mt-4 mb-2">
          Pricing Equations
        </h3>
        <p className="text-gray-300">
          Understand the exact formulas used to calculate each metric.
        </p>
        <div className="relative inline-block overflow-auto shadow-lg sm:rounded-lg mt-4 border-[#05c8fb]">
          <table className="table-auto text-left text-blue-100 text-xs w-full">
            <thead className="bg-[#00417d] uppercase">
              <tr>
                <th scope="col" className="px-3 py-1 font-medium">Metric</th>
                <th scope="col" className="px-3 py-1 font-medium">Formula</th>
              </tr>
            </thead>
            <tbody className="bg-[#00264a] divide-y divide-[#05c8fb]/50 leading-tight">
              <tr>
                <td className="px-3 py-1">Labor Cost</td>
                <td className="px-3 py-1">Hourly Labor Rate × Hours</td>
              </tr>
              <tr>
                <td className="px-3 py-1">Material Cost</td>
                <td className="px-3 py-1">Unit Material Cost × Quantity</td>
              </tr>
              <tr>
                <td className="px-3 py-1">Subtotal</td>
                <td className="px-3 py-1">Labor Cost + Material Cost</td>
              </tr>
              <tr>
                <td className="px-3 py-1">Labor Price</td>
                <td className="px-3 py-1">Labor Cost + Labor Margin</td>
              </tr>
              <tr>
                <td className="px-3 py-1">Material Price</td>
                <td className="px-3 py-1">Material Cost + Material Markup</td>
              </tr>
              <tr>
                <td className="px-3 py-1">Unit Price</td>
                <td className="px-3 py-1">Labor Price + Material Price − Discount</td>
              </tr>
              <tr>
                <td className="px-3 py-1">Profit</td>
                <td className="px-3 py-1">Unit Price − (Labor Cost + Material Cost)</td>
              </tr>
              <tr>
                <td className="px-3 py-1">Line Total</td>
                <td className="px-3 py-1">Unit Price × Quantity</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* --- */}
      <div className="my-6 border-t border-white/20" />

      <section>
        <h2 className="text-xl text-white font-semibold mb-3">
          Key Terms
        </h2>
        <ul className="list-disc list-inside space-y-1 ml-4 text-gray-300">
          <li>
            **CPQ**: Configure, Price, Quote.
          </li>
          <li>
            **Component**: An individual item or service in the quote.
          </li>
          <li>
            **Optional**: A component that isn&apos;t included by default.
          </li>
          <li>
            **Cost**: Internal expense (Labor + Material).
          </li>
          <li>
            **Price**: Final selling price to the customer.
          </li>
          <li>
            **Profit**: The difference between Price and Cost.
          </li>
        </ul>
      </section>
    </div>
  );

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 text-xs rounded-md text-white bg-gray-800 border border-gray-700 hover:bg-gray-700 transition-colors shadow-sm"
      >
        <BookOpenIcon className="w-4 h-4 text-[#05c8fb]" />
        User Guide
      </button>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <motion.div
          className="fixed inset-0 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <motion.div
            className="w-full max-w-3xl max-h-[90vh] bg-gray-900 p-6 rounded-lg border border-gray-700 text-white overflow-y-auto"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <div className="flex justify-between items-center sticky top-0 bg-gray-900 pb-2 border-b border-gray-700 z-10">
              <Dialog.Title className="text-xl font-semibold">
                CPQ Advanced User Guide
              </Dialog.Title>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full p-1 text-gray-400 hover:bg-gray-700 hover:text-white transition-colors"
                aria-label="Close"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
            {userGuideContent}
          </motion.div>
        </div>
      </Dialog>
    </>
  );
}