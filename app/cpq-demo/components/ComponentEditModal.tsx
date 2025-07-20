// File: app/cpq-demo/components/ComponentEditModal.tsx

import React from 'react';
import { Dialog } from '@headlessui/react';
import { Listbox } from '@headlessui/react';
import { CPQComponent, iconOptions } from '../models';
import { computePricing } from '../pricing';

type Props = {
  component: CPQComponent;
  onClose: () => void;
  onUpdate: (
    id: string,
    field: keyof Omit<CPQComponent, 'id' | 'optional' | 'Icon' | 'unit'>,
    value: any
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
    grossMarginDollars,
    grossMarginPercent,
  } = computePricing(comp);

  // Conditional coloring helper
  const colorClass = profit > 0
    ? 'text-green-400'
    : profit < 0
    ? 'text-red-400'
    : 'text-yellow-400';

  return (
    <Dialog open onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-2xl bg-gray-900 p-6 rounded-lg border border-gray-700 text-white">
          <Dialog.Title className="text-lg font-bold mb-4 flex justify-between items-center">
            Edit Component
            <button
              onClick={() => {
                if (confirm('Are you sure you want to delete this component?')) {
                  onDelete(id);
                  onClose();
                }
              }}
              className="text-red-500 hover:text-red-400 text-sm"
            >
              Delete
            </button>
          </Dialog.Title>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Name */}
            <label className="flex flex-col text-xs">
              Name
              <input
                type="text"
                value={name}
                onChange={(e) => onUpdate(id, 'name', e.target.value)}
                className="mt-1 bg-gray-800 border border-gray-600 rounded px-2 py-1"
              />
            </label>

            {/* Icon Selector */}
            <label className="flex flex-col text-xs">
              Icon
              <Listbox
                value={iconOptions.find((o) => o.Icon === Icon)}
                onChange={(sel) => onUpdate(id, 'Icon', sel.Icon)}
              >
                <Listbox.Button className="mt-1 bg-gray-800 border border-gray-600 rounded px-2 py-1 flex items-center gap-2">
                  <Icon className="w-4 h-4 text-[#05c8fb]" />
                  {iconOptions.find((o) => o.Icon === Icon)?.label}
                </Listbox.Button>
                <Listbox.Options className="absolute mt-1 bg-gray-800 border border-gray-600 rounded z-10">
                  {iconOptions.map((o) => (
                    <Listbox.Option key={o.id} value={o} className="cursor-pointer px-2 py-1 hover:bg-gray-700 flex items-center gap-2">
                      <o.Icon className="w-4 h-4 text-[#05c8fb]" />
                      {o.label}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Listbox>
            </label>

            {/* Labor Cost */}
            <label className="flex flex-col text-xs">
              Unit Labor Cost ($/hr)
              <input
                type="number"
                min={0}
                value={unitLaborCost}
                onChange={(e) => onUpdate(id, 'unitLaborCost', +e.target.value)}
                className="mt-1 bg-gray-800 border border-gray-600 rounded px-2 py-1"
              />
            </label>

            {/* Labor Hours */}
            <label className="flex flex-col text-xs">
              Labor Hours
              <input
                type="number"
                min={0}
                step={0.5}
                value={laborHours}
                onChange={(e) => onUpdate(id, 'laborHours', +e.target.value)}
                className="mt-1 bg-gray-800 border border-gray-600 rounded px-2 py-1"
              />
            </label>

            {/* Material Cost */}
            <label className="flex flex-col text-xs">
              Unit Material Cost ($/unit)
              <input
                type="number"
                min={0}
                value={unitMaterialCost}
                onChange={(e) => onUpdate(id, 'unitMaterialCost', +e.target.value)}
                className="mt-1 bg-gray-800 border border-gray-600 rounded px-2 py-1"
              />
            </label>

            {/* Quantity */}
            <label className="flex flex-col text-xs">
              Quantity
              <input
                type="number"
                min={0}
                value={quantity}
                onChange={(e) => onUpdate(id, 'quantity', +e.target.value)}
                className="mt-1 bg-gray-800 border border-gray-600 rounded px-2 py-1"
              />
            </label>

            {/* Labor Margin % */}
            <label className="flex flex-col text-xs">
              Labor Margin (%)
              <input
                type="number"
                min={0}
                max={500}
                value={laborMarginPercent}
                onChange={(e) => onUpdate(id, 'laborMarginPercent', +e.target.value)}
                className="mt-1 bg-gray-800 border border-gray-600 rounded px-2 py-1"
              />
            </label>

            {/* Material Markup % */}
            <label className="flex flex-col text-xs">
              Material Markup (%)
              <input
                type="number"
                min={0}
                max={500}
                value={materialMarkupPercent}
                onChange={(e) => onUpdate(id, 'materialMarkupPercent', +e.target.value)}
                className="mt-1 bg-gray-800 border border-gray-600 rounded px-2 py-1"
              />
            </label>

            {/* Discount % */}
            <label className="flex flex-col text-xs">
              Discount (%)
              <input
                type="number"
                min={0}
                max={100}
                value={discountPercent}
                onChange={(e) => onUpdate(id, 'discountPercent', +e.target.value)}
                className="mt-1 bg-gray-800 border border-gray-600 rounded px-2 py-1"
              />
            </label>
          </div>

{/* Read‑only summary */}
<div className="mt-6 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 text-xs">

  {/* ───── Cost Section ───── */}
  <div>
    <div className="text-gray-400">Labor Cost $</div>
    <div className="text-white font-semibold">${laborCost.toFixed(2)}</div>
  </div>
  <div>
    <div className="text-gray-400">Material Cost $</div>
    <div className="text-white font-semibold">${materialCost.toFixed(2)}</div>
  </div>
  <div>
    <div className="text-gray-400">Subtotal $</div>
    <div className="text-white font-semibold">
      ${(laborCost + materialCost).toFixed(2)}
    </div>
  </div>

  {/* ───── Price Section ───── */}
  <div>
    <div className="text-gray-400">Labor Price $</div>
    <div className="text-white font-semibold">
      ${(laborCost + laborMarginDollars).toFixed(2)}
    </div>
  </div>
  <div>
    <div className="text-gray-400">Material Price $</div>
    <div className="text-white font-semibold">
      ${(materialCost + materialMarkupDollars).toFixed(2)}
    </div>
  </div>
  <div>
    <div className="text-gray-400">Discount % / $</div>
    <div className={`${discountPercent > 0 ? 'text-red-400' : 'text-white'} font-semibold`}>
      {discountPercent}% / -${discountDollars.toFixed(2)}
    </div>
  </div>

  {/* ───── Line Item Section ───── */}
  <div>
    <div className="text-gray-400">Unit Price</div>
    <div className="text-white font-semibold">${unitPrice.toFixed(2)}</div>
  </div>
  <div>
    <div className="text-gray-400">Profit $ / %</div>
    <div className={`${colorClass} font-semibold`}>
      ${profit.toFixed(2)} / {profitPercent.toFixed(1)}%
    </div>
  </div>
  <div>
    <div className="text-gray-400">Gross Margin $ / %</div>
    <div className="text-white font-semibold">
      ${grossMarginDollars.toFixed(2)} / {grossMarginPercent.toFixed(1)}%
    </div>
  </div>

  {/* Optional Line‑Total */}
  {quantity > 1 && (
    <div>
      <div className="text-gray-400">Line Total $</div>
      <div className="text-white font-semibold">
        ${(unitPrice * quantity).toFixed(2)}
      </div>
    </div>
  )}
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
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
