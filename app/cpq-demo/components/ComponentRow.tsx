// File: app/cpq-demo/components/ComponentRow.tsx

import React from 'react';
import { CPQComponent } from '../models';
import { computePricing } from '../pricing';

type Props = {
  component: CPQComponent;
  openEditModal: (id: string) => void;
  toggleInclude: (id: string) => void;
  updateComponent: (
    id: string,
    field: keyof CPQComponent,
    value: string | number | React.ComponentType<{ className?: string }>
  ) => void;
};

export default function ComponentRow({
  component: comp,
  openEditModal,
  toggleInclude,
  updateComponent,
}: Props) {
  const { unitPrice } = computePricing(comp);

  return (
    <div className="flex items-center text-white text-[11px] sm:text-sm border-b border-white/10 py-2 max-w-screen-lg mx-auto">
      {/* Name + Icon */}
      <div className="flex-[2] flex items-center gap-2 px-1 sm:px-2 truncate">
        <comp.Icon className="text-[#05c8fb] w-4 h-4 flex-shrink-0" />
        <span>{comp.name}</span>
      </div>

      {/* Unit Price */}
      <div className="flex-[1] text-center px-1 sm:px-2 text-[#05c8fb]">
        ${unitPrice.toFixed(2)}
      </div>

      {/* Include */}
      <div className="flex-[1] flex justify-center px-1 sm:px-2">
        <input
          type="checkbox"
          checked={comp.quantity > 0}
          onChange={() => toggleInclude(comp.id)}
          className="h-4 w-4 sm:h-5 sm:w-5 text-[#05c8fb] bg-gray-700/50 border border-gray-600 rounded focus:ring-[#05c8fb]"
        />
      </div>

      {/* Quantity (editable when included) */}
      <div className="flex-[1] flex justify-center px-1 sm:px-2">
        {comp.quantity > 0 ? (
          <input
            type="number"
            min={1}
            value={comp.quantity}
            onChange={(e) =>
              updateComponent(comp.id, 'quantity', parseInt(e.target.value) || 1)
            }
            className="w-12 sm:w-16 bg-gray-700/50 border border-gray-600 text-white rounded px-1 py-[2px] text-[10px] sm:text-xs text-center focus:outline-none"
          />
        ) : (
          <span className="opacity-50">—</span>
        )}
      </div>

      {/* Edit Button */}
      <div className="flex-[1] flex justify-center px-1 sm:px-2">
        <button
          onClick={() => openEditModal(comp.id)}
          className="text-[#05c8fb] hover:text-white text-xs"
        >
          Edit
        </button>
      </div>
    </div>
  );
}
