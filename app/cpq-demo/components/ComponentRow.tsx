import React from 'react';
import { CPQComponent } from '../models';
import { computePricing } from '../pricing';
import { TrashIcon } from '@heroicons/react/24/outline';

type Props = {
  component: CPQComponent;
  openEditModal: (id: string) => void;
  toggleInclude: (id: string) => void;
  updateComponent: (
    id: string,
    field: keyof CPQComponent,
    value: string | number | React.ComponentType<{ className?: string }>
  ) => void;
  removeComponent: (id: string) => void;
};

export default function ComponentRow({
  component: comp,
  openEditModal,
  toggleInclude,
  updateComponent,
  removeComponent,
}: Props) {
  const { unitPrice } = computePricing(comp);

  return (
    <div className="flex items-center text-white text-[11px] sm:text-sm border-b border-white/10 py-2 max-w-screen-lg mx-auto">
      {/* Name + Icon */}
      <div className="flex-[2] flex items-center gap-2 px-1 sm:px-2 truncate">
        <comp.Icon className="text-[#05c8fb] w-4 h-4 flex-shrink-0" />
        <span className="truncate">{comp.name || <em className="opacity-50">Unnamed</em>}</span>
      </div>

      {/* Unit Price */}
      <div className="flex-[1] text-center px-1 sm:px-2 text-[#05c8fb]">
        ${unitPrice.toFixed(2)}
      </div>

      {/* Include */}
      <div className="flex-[1] flex justify-center px-1 sm:px-2">
        <input
          type="checkbox"
          aria-label={`Include ${comp.name}`}
          checked={comp.quantity > 0}
          onChange={() => toggleInclude(comp.id)}
          className="h-4 w-4 sm:h-5 sm:w-5 text-[#05c8fb] bg-gray-700/50 border border-gray-600 rounded focus:ring-[#05c8fb]"
        />
      </div>

      {/* Quantity */}
      <div className="flex-[1] flex justify-center px-1 sm:px-2">
        {comp.quantity > 0 ? (
          <input
            type="number"
            min={1}
            placeholder="1"
            value={comp.quantity === 0 ? '' : comp.quantity}
            onChange={e =>
              updateComponent(
                comp.id,
                'quantity',
                e.target.value === '' ? 1 : Math.max(1, parseInt(e.target.value, 10) || 1)
              )
            }
            className="w-12 sm:w-16 bg-gray-700/50 border border-gray-600 text-white rounded px-1 py-[2px] text-[10px] sm:text-xs text-center focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        ) : (
          <span className="opacity-50">—</span>
        )}
      </div>

      {/* Edit */}
      <div className="flex-[1] flex justify-center px-1 sm:px-2">
        <button
          onClick={() => openEditModal(comp.id)}
          className="text-[#05c8fb] hover:text-white text-xs focus:outline-none"
          aria-label={`Edit ${comp.name}`}
        >
          Edit
        </button>
      </div>

      {/* Delete */}
      <div className="flex-[1] flex justify-center px-1 sm:px-2">
        <button
          onClick={() => {
            if (!confirm(`Are you sure you want to delete "${comp.name}"?`)) return;
            try {
              removeComponent(comp.id);
            } catch (err) {
              console.error('Delete error:', err);
              alert('An error occurred while deleting this component.');
            }
          }}
          className="text-red-500 hover:text-red-400 focus:outline-none"
          aria-label={`Delete ${comp.name}`}
        >
          <TrashIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
