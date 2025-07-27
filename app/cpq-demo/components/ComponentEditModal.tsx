import React from 'react';
import { Dialog } from '@headlessui/react';
import { Listbox } from '@headlessui/react';
import { motion } from 'framer-motion';
import { CPQComponent, iconOptions, initialCPQComponents } from '../models';
import { computePricing } from '../pricing';

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
    name,
    Icon,
    unitLaborCost,
    laborHours,
    unitMaterialCost,
    quantity,
    laborMarginPercent,
    materialMarkupPercent,
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
        className="fixed inset-0 bg-black/40 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        {/* Panel */}
        <motion.div
          className="w-full max-w-2xl max-h-[90vh] bg-gray-900 p-6 rounded-lg border border-gray-700 text-white overflow-auto"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          {/* Header & Bulk Actions */}
          <Dialog.Title className="flex justify-between items-center text-lg font-bold mb-4">
            <span>Edit Component</span>
            <div className="flex gap-2">
              {/* Clear Data */}
              <button
                onClick={() => {
                  if (!confirm('Are you sure you want to clear all data for this component?'))
                    return;
                  try {
                    clearFields.forEach(field => {
                      const isString = typeof comp[field] === 'string';
                      onUpdate(id, field, isString ? '' : 0);
                    });
                  } catch (err) {
                    console.error('Clear error:', err);
                    alert('An error occurred while clearing data.');
                  }
                }}
                className="text-yellow-400 hover:text-yellow-300 text-sm"
              >
                Clear Data
              </button>

              {/* Load Seed Data */}
              <button
                onClick={() => {
                  if (!seed) {
                    alert('No seed data available for this component.');
                    return;
                  }
                  if (!confirm('Are you sure you want to load the seed values?')) return;
                  try {
                    Object.entries(seed).forEach(([field, value]) => {
                      if (field === 'id' || field === 'optional') return;
                      onUpdate(id, field as keyof CPQComponent, value as any);
                    });
                  } catch (err) {
                    console.error('Seed load error:', err);
                    alert('An error occurred while loading seed data.');
                  }
                }}
                className="text-green-400 hover:text-green-300 text-sm"
              >
                Load Seed Data
              </button>

              {/* Delete */}
              <button
                onClick={() => {
                  if (!confirm(`Are you sure you want to delete "${name}"?`)) return;
                  try {
                    onDelete(id);
                    onClose();
                  } catch (err) {
                    console.error('Delete error:', err);
                    alert('An error occurred while deleting this component.');
                  }
                }}
                className="text-red-500 hover:text-red-400 text-sm"
              >
                Delete
              </button>
            </div>
          </Dialog.Title>

          {/* Inputs */}
          <div className="grid grid-cols-2 gap-4 text-xs">
            {/* Name */}
            <label className="flex flex-col">
              Name
              <input
                type="text"
                value={name}
                onChange={e => onUpdate(id, 'name', e.target.value)}
                className="mt-1 bg-gray-800 border border-gray-600 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </label>

            {/* Icon */}
            <label className="flex flex-col">
              Icon
              <Listbox
                value={iconOptions.find(o => o.Icon === Icon)}
                onChange={sel => onUpdate(id, 'Icon', sel.Icon)}
              >
                <Listbox.Button className="mt-1 bg-gray-800 border border-gray-600 rounded px-2 py-1 flex items-center gap-2 hover:bg-gray-700">
                  <Icon className="w-4 h-4 text-[#05c8fb]" />
                  {iconOptions.find(o => o.Icon === Icon)?.label}
                </Listbox.Button>
                <Listbox.Options className="absolute mt-1 bg-gray-800 border border-gray-600 rounded z-10">
                  {iconOptions.map(o => (
                    <Listbox.Option
                      key={o.id}
                      value={o}
                      className="cursor-pointer px-2 py-1 hover:bg-gray-700 flex items-center gap-2"
                    >
                      <o.Icon className="w-4 h-4 text-[#05c8fb]" />
                      {o.label}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Listbox>
            </label>

            {/* Quantity */}
            <label className="flex flex-col">
              Quantity
              <input
                type="number"
                placeholder="0"
                value={quantity === 0 ? '' : quantity}
                onChange={e => onUpdate(id, 'quantity', e.target.value === '' ? 0 : +e.target.value)}
                className="mt-1 bg-gray-800 border border-gray-600 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </label>

            {/* Discount */}
            <label className="flex flex-col">
              Discount (%)
              <input
                type="number"
                placeholder="0"
                value={discountPercent === 0 ? '' : discountPercent}
                onChange={e =>
                  onUpdate(id, 'discountPercent', e.target.value === '' ? 0 : +e.target.value)
                }
                className="mt-1 bg-gray-800 border border-gray-600 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </label>

            {/* Unit Material Cost */}
            <label className="flex flex-col">
              Unit Material Cost ($/unit)
              <input
                type="number"
                placeholder="0"
                value={unitMaterialCost === 0 ? '' : unitMaterialCost}
                onChange={e =>
                  onUpdate(id, 'unitMaterialCost', e.target.value === '' ? 0 : +e.target.value)
                }
                className="mt-1 bg-gray-800 border border-gray-600 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </label>

            {/* Unit Labor Cost */}
            <label className="flex flex-col">
              Unit Labor Cost ($/hr)
              <input
                type="number"
                placeholder="0"
                value={unitLaborCost === 0 ? '' : unitLaborCost}
                onChange={e =>
                  onUpdate(id, 'unitLaborCost', e.target.value === '' ? 0 : +e.target.value)
                }
                className="mt-1 bg-gray-800 border border-gray-600 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </label>

            {/* Material Markup */}
            <label className="flex flex-col">
              Material Markup (%)
              <input
                type="number"
                placeholder="0"
                value={materialMarkupPercent === 0 ? '' : materialMarkupPercent}
                onChange={e =>
                  onUpdate(id, 'materialMarkupPercent', e.target.value === '' ? 0 : +e.target.value)
                }
                className="mt-1 bg-gray-800 border border-gray-600 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </label>

            {/* Labor Margin */}
            <label className="flex flex-col">
              Labor Margin (%)
              <input
                type="number"
                placeholder="0"
                value={laborMarginPercent === 0 ? '' : laborMarginPercent}
                onChange={e =>
                  onUpdate(id, 'laborMarginPercent', e.target.value === '' ? 0 : +e.target.value)
                }
                className="mt-1 bg-gray-800 border border-gray-600 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </label>

            {/* Labor Hours (full width) */}
            <label className="col-span-2 flex flex-col">
              Labor Hours
              <input
                type="number"
                placeholder="0"
                value={laborHours === 0 ? '' : laborHours}
                onChange={e => onUpdate(id, 'laborHours', e.target.value === '' ? 0 : +e.target.value)}
                className="mt-1 bg-gray-800 border border-gray-600 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </label>
          </div>

          {/* Summary */}
          <motion.div
            className="mt-6 grid grid-cols-2 lg:grid-cols-3 gap-4 text-xs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div>
              <div className="text-gray-400">Labor Cost $</div>
              <div className="font-semibold">${laborCost.toFixed(2)}</div>
            </div>
            <div>
              <div className="text-gray-400">Material Cost $</div>
              <div className="font-semibold">${materialCost.toFixed(2)}</div>
            </div>
            <div>
              <div className="text-gray-400">Subtotal $</div>
              <div className="font-semibold">${(laborCost + materialCost).toFixed(2)}</div>
            </div>
            <div>
              <div className="text-gray-400">Labor Price $</div>
              <div className="font-semibold">${(laborCost + laborMarginDollars).toFixed(2)}</div>
            </div>
            <div>
              <div className="text-gray-400">Material Price $</div>
              <div className="font-semibold">${(materialCost + materialMarkupDollars).toFixed(2)}</div>
            </div>
            <div>
              <div className="text-gray-400">Discount (% / $)</div>
              <div className="font-semibold">{discountPercent}% / -${discountDollars.toFixed(2)}</div>
            </div>
            <div>
              <div className="text-gray-400">Unit Price $</div>
              <div className="font-semibold">${unitPrice.toFixed(2)}</div>
            </div>
            <div>
              <div className="text-gray-400">Profit $ / %</div>
              <div className={`${colorClass} font-semibold`}>
                ${profit.toFixed(2)} / {profitPercent.toFixed(1)}%
              </div>
            </div>
            {quantity > 1 && (
              <div>
                <div className="text-gray-400">Line Total $</div>
                <div className="font-semibold">${(unitPrice * quantity).toFixed(2)}</div>
              </div>
            )}
          </motion.div>

          {/* Equations */}
          <div className="mt-6 text-xs">
            <h3 className="font-semibold mb-2">Equations</h3>
            <table className="w-full border border-gray-700 text-sm">
              <tbody>
                <tr className="border-t border-gray-700">
                  <td className="px-2 py-1 font-medium">Labor Cost ($)</td>
                  <td className="px-2 py-1">Hourly Labor Rate × Hours Worked</td>
                </tr>
                <tr className="border-t border-gray-700">
                  <td className="px-2 py-1 font-medium">Material Cost ($)</td>
                  <td className="px-2 py-1">Unit Material Cost × Quantity</td>
                </tr>
                <tr className="border-t border-gray-700">
                  <td className="px-2 py-1 font-medium">Subtotal ($)</td>
                  <td className="px-2 py-1">Labor Cost + Material Cost</td>
                </tr>
                <tr className="border-t border-gray-700">
                  <td className="px-2 py-1 font-medium">Labor Price ($)</td>
                  <td className="px-2 py-1">Labor Cost + Labor Margin ($)</td>
                </tr>
                <tr className="border-t border-gray-700">
                  <td className="px-2 py-1 font-medium">Material Price ($)</td>
                  <td className="px-2 py-1">Material Cost + Material Markup ($)</td>
                </tr>
                <tr className="border-t border-gray-700">
                  <td className="px-2 py-1 font-medium">Discount ($)</td>
                  <td className="px-2 py-1">Unit Price × (Discount % / 100)</td>
                </tr>
                <tr className="border-t border-gray-700">
                  <td className="px-2 py-1 font-medium">Unit Price ($)</td>
                  <td className="px-2 py-1">Labor Price + Material Price − Discount ($)</td>
                </tr>
                <tr className="border-t border-gray-700">
                  <td className="px-2 py-1 font-medium">Profit ($)</td>
                  <td className="px-2 py-1">Unit Price − (Labor Cost + Material Cost)</td>
                </tr>
                {quantity > 1 && (
                  <tr className="border-t border-gray-700">
                    <td className="px-2 py-1 font-medium">Line Total ($)</td>
                    <td className="px-2 py-1">Unit Price × Quantity</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Actions */}
          <div className="mt-6 flex justify-end gap-4">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 text-sm"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </Dialog>
  );
}
