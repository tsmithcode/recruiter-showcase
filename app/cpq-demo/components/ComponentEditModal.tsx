import React from 'react';
import { Dialog } from '@headlessui/react';
import { motion } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { CPQComponent, initialCPQComponents } from '../models';
import { computePricing } from '../pricing';
import { PricingSummary } from './PricingSummary';
import { ComponentInputs } from './ComponentInputs';
import { ComponentActions } from './ComponentActions';


type Props = {
  component: CPQComponent;
  onClose: () => void;
  onUpdate: (
    id: string,
    field: keyof CPQComponent,
    value: string | number | React.ComponentType<{ className?: string }>
  ) => void;
  onDelete: (id: string) => void;
};

export default function ComponentEditModal({
  component: comp,
  onClose,
  onUpdate,
  onDelete,
}: Props) {
  const {
    id,
    quantity,
    discountPercent,
  } = comp;

  const {
    laborCost,
    materialCost,
    laborMarginDollars,
    materialMarkupDollars,
    discountDollars,
    unitPrice,
    profit,
    profitPercent,
  } = computePricing(comp);

  const colorClass =
    profit > 0 ? 'text-green-400' :
    profit < 0 ? 'text-red-400' :
                  'text-yellow-400';

  // Locate seed data
  const seed = initialCPQComponents.find(c => c.id === id);

  // Fields to clear
  const clearFields: (keyof CPQComponent)[] = [
    'name',
    'unitLaborCost',
    'laborHours',
    'unitMaterialCost',
    'quantity',
    'laborMarginPercent',
    'materialMarkupPercent',
    'discountPercent',
  ];

  return (
    <Dialog open onClose={onClose} className="relative z-50">
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        {/* Panel */}
        <motion.div
          className="app-dialog-scroll w-full max-w-2xl rounded-[1.5rem] border border-gray-700 bg-gray-900 text-white"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          {/* Header & Bulk Actions */}
          <div className="app-dialog-header">
            <Dialog.Title className="text-lg font-semibold">Edit Component</Dialog.Title>
            <button
              type="button"
              onClick={onClose}
              className="app-touch-target inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-slate-300 transition hover:border-white/20 hover:text-white"
              aria-label="Close edit component dialog"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>

          <div className="app-dialog-body">
            <ComponentInputs comp={comp} onUpdate={onUpdate} />

            <PricingSummary
              laborCost={laborCost}
              materialCost={materialCost}
              laborMarginDollars={laborMarginDollars}
              materialMarkupDollars={materialMarkupDollars}
              discountPercent={discountPercent}
              discountDollars={discountDollars}
              unitPrice={unitPrice}
              profit={profit}
              profitPercent={profitPercent}
              quantity={quantity}
              colorClass={colorClass}
            />

            <ComponentActions
              comp={comp}
              clearFields={clearFields}
              seed={seed}
              onUpdate={onUpdate}
              onDelete={onDelete}
              onClose={onClose}
            />
          </div>
        </motion.div>
      </div>
    </Dialog>
  );
}
