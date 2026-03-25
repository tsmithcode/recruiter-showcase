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
  mode?: 'customer' | 'manager'; // <-- optional for backward compatibility
};


export default function ComponentRow({
  component: comp,
  openEditModal,
  toggleInclude,
  updateComponent,
  removeComponent,
  mode = 'manager', // <-- default to manager
}: Props) {
  const { unitPrice } = computePricing(comp);
  const isCustomer = mode === 'customer';

  return (
    <>
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-white sm:hidden">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <comp.Icon className="h-5 w-5 flex-shrink-0 text-[#05c8fb]" />
              <span className="truncate font-semibold">
                {comp.name || <em className="opacity-50">Unnamed</em>}
              </span>
            </div>
            <p className="mt-2 text-sm text-[#05c8fb]">${unitPrice.toFixed(2)} unit price</p>
          </div>
          {!isCustomer ? (
            <button
              onClick={() => openEditModal(comp.id)}
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-[#05c8fb] transition hover:text-white"
              aria-label={`Edit ${comp.name}`}
            >
              Edit
            </button>
          ) : null}
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <label className="flex min-h-11 items-center gap-3 rounded-xl border border-white/10 px-3 py-2">
            <input
              type="checkbox"
              aria-label={`Include ${comp.name}`}
              checked={comp.quantity > 0}
              onChange={() => toggleInclude(comp.id)}
              className="h-5 w-5 rounded border border-gray-600 bg-gray-700/50 text-[#05c8fb] focus:ring-[#05c8fb]"
            />
            <span>Include</span>
          </label>

          <label className="flex flex-col gap-1 rounded-xl border border-white/10 px-3 py-2">
            <span className="text-xs uppercase tracking-wide text-gray-400">Quantity</span>
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
                className="min-h-11 rounded border border-gray-600 bg-gray-700/50 px-3 py-2 text-base text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            ) : (
              <span className="py-2 text-sm opacity-50">Not included</span>
            )}
          </label>
        </div>

        {!isCustomer ? (
          <div className="mt-3 flex justify-end">
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
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-red-400/30 px-4 py-2 text-sm font-medium text-red-300 transition hover:border-red-400/60 hover:text-red-200"
              aria-label={`Delete ${comp.name}`}
            >
              Delete
            </button>
          </div>
        ) : null}
      </div>

      <div className="hidden items-center border-b border-white/10 py-1 text-white sm:flex sm:text-xs">
        <div className="flex-[2] truncate px-1 sm:px-2">
          <div className="flex items-center gap-2 truncate">
            <comp.Icon className="h-4 w-4 flex-shrink-0 text-[#05c8fb]" />
            <span className="truncate">{comp.name || <em className="opacity-50">Unnamed</em>}</span>
          </div>
        </div>

        <div className="flex-[1] px-1 text-center text-[#05c8fb] sm:px-2">
          ${unitPrice.toFixed(2)}
        </div>

        <div className="flex flex-[1] justify-center px-1 sm:px-2">
          <input
            type="checkbox"
            aria-label={`Include ${comp.name}`}
            checked={comp.quantity > 0}
            onChange={() => toggleInclude(comp.id)}
            className="h-5 w-5 rounded border border-gray-600 bg-gray-700/50 text-[#05c8fb] focus:ring-[#05c8fb]"
          />
        </div>

        <div className="flex flex-[1] justify-center px-1 sm:px-2">
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
              className="w-16 rounded border border-gray-600 bg-gray-700/50 px-2 py-2 text-center text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          ) : (
            <span className="opacity-50">—</span>
          )}
        </div>

        {!isCustomer && (
          <div className="flex flex-[1] justify-center px-1 sm:px-2">
            <button
              onClick={() => openEditModal(comp.id)}
              className="text-xs text-[#05c8fb] hover:text-white focus:outline-none"
              aria-label={`Edit ${comp.name}`}
            >
              Edit
            </button>
          </div>
        )}

        {!isCustomer && (
          <div className="flex flex-[1] justify-center px-1 sm:px-2">
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
        )}
      </div>
    </>
  );
}
