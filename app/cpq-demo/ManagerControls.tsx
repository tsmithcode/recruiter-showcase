// File: app/cpq-demo/components/ManagerControls.tsx

import React from 'react';

type Props = {
  marginPercent: number;
  markupPercent: number;
  discountPercent: number;
  setMarginPercent: (val: number) => void;
  setMarkupPercent: (val: number) => void;
  setDiscountPercent: (val: number) => void;
  onAddComponent: () => void;
};

export default function ManagerControls({
  marginPercent,
  markupPercent,
  discountPercent,
  setMarginPercent,
  setMarkupPercent,
  setDiscountPercent,
  onAddComponent,
}: Props) {
  return (
    <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="flex flex-col">
        <label className="text-gray-400 text-xs mb-1">Labor Margin %</label>
        <input
          type="number"
          min={0}
          max={100}
          step={1}
          value={marginPercent}
          onChange={(e) => setMarginPercent(parseFloat(e.target.value) || 0)}
          className="bg-gray-700/50 border border-gray-600 text-white rounded px-2 py-1 text-xs focus:outline-none"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-gray-400 text-xs mb-1">Material Markup %</label>
        <input
          type="number"
          min={0}
          max={100}
          step={1}
          value={markupPercent}
          onChange={(e) => setMarkupPercent(parseFloat(e.target.value) || 0)}
          className="bg-gray-700/50 border border-gray-600 text-white rounded px-2 py-1 text-xs focus:outline-none"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-gray-400 text-xs mb-1">Discount %</label>
        <input
          type="number"
          min={0}
          max={100}
          step={1}
          value={discountPercent}
          onChange={(e) => setDiscountPercent(parseFloat(e.target.value) || 0)}
          className="bg-gray-700/50 border border-gray-600 text-white rounded px-2 py-1 text-xs focus:outline-none"
        />
      </div>

      <div className="flex items-end justify-end">
        <button
          onClick={onAddComponent}
          className="bg-[#05c8fb] text-[#0b253f] font-semibold rounded-full px-4 py-2 text-xs hover:opacity-90 transition"
        >
          + Add Component
        </button>
      </div>
    </div>
  );
}
