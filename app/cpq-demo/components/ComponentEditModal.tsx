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
    id, name, Icon, unitLaborCost, laborHours,
    unitMaterialCost, quantity, laborMarginPercent,
    materialMarkupPercent, discountPercent,
  } = comp;

  const {
    laborCost, materialCost, laborMarginDollars,
    materialMarkupDollars, discountDollars, unitPrice,
    profit, profitPercent, grossMarginDollars,
    grossMarginPercent,
  } = computePricing(comp);

  const colorClass =
    profit > 0 ? 'text-green-400' :
    profit < 0 ? 'text-red-400' :
    'text-yellow-400';

  return (
    <Dialog open onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-2xl max-h-[90vh] bg-gray-900 p-6 rounded-lg border border-gray-700 text-white overflow-auto">
          {/* Header */}
          <Dialog.Title className="flex justify-between items-center text-lg font-bold mb-4">
            Edit Component
            <button
              onClick={() => {
                if (confirm('Delete this component?')) {
                  onDelete(id);
                  onClose();
                }
              }}
              className="text-red-500 hover:text-red-400 text-sm"
            >
              Delete
            </button>
          </Dialog.Title>

          {/* Editable Fields */}
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
            {[
              ['Name', name, 'name'],
              ['Unit Labor Cost ($/hr)', unitLaborCost, 'unitLaborCost'],
              ['Labor Hours', laborHours, 'laborHours'],
              ['Unit Material Cost ($/unit)', unitMaterialCost, 'unitMaterialCost'],
              ['Quantity', quantity, 'quantity'],
              ['Labor Margin (%)', laborMarginPercent, 'laborMarginPercent'],
              ['Material Markup (%)', materialMarkupPercent, 'materialMarkupPercent'],
              ['Discount (%)', discountPercent, 'discountPercent'],
            ].map(([label, value, field]) => (
              <label key={field as string} className="flex flex-col text-xs">
                {label}
                <input
                  type={field === 'name' ? 'text' : 'number'}
                  min="0"
                  step={label.includes('Hours') ? '0.5' : '1'}
                  value={value as number | string}
                  onChange={e =>
                    onUpdate(id, field as keyof CPQComponent, field === 'name' ? e.target.value : +e.target.value)
                  }
                  className="mt-1 bg-gray-800 border border-gray-600 rounded px-2 py-1"
                />
              </label>
            ))}

            {/* Icon Selector */}
            <label className="flex flex-col text-xs">
              Icon
              <Listbox
                value={iconOptions.find(o => o.Icon === Icon)}
                onChange={(sel) => onUpdate(id, 'Icon', sel.Icon)}
              >
                <Listbox.Button className="mt-1 bg-gray-800 border border-gray-600 rounded px-2 py-1 flex items-center gap-2">
                  <Icon className="w-4 h-4 text-[#05c8fb]" />
                  {iconOptions.find(o => o.Icon === Icon)?.label}
                </Listbox.Button>
                <Listbox.Options className="absolute mt-1 bg-gray-800 border border-gray-600 rounded z-10">
                  {iconOptions.map(o => (
                    <Listbox.Option key={o.id} value={o} className="cursor-pointer px-2 py-1 hover:bg-gray-700 flex items-center gap-2">
                      <o.Icon className="w-4 h-4 text-[#05c8fb]" />
                      {o.label}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Listbox>
            </label>
          </div>

          {/* Summary Section */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            {[
              ['Labor Cost $', laborCost],
              ['Material Cost $', materialCost],
              ['Subtotal $', laborCost + materialCost],
              ['Labor Price $', laborCost + laborMarginDollars],
              ['Material Price $', materialCost + materialMarkupDollars],
              ['Discount (% / $)', `${discountPercent}% / -$${discountDollars.toFixed(2)}`],
              ['Unit Price', unitPrice],
              ['Profit $ / %', `${profit.toFixed(2)} / ${profitPercent.toFixed(1)}%`],
              ['Gross Margin $ / %', `${grossMarginDollars.toFixed(2)} / ${grossMarginPercent.toFixed(1)}%`],
              ...(quantity > 1 ? [['Line Total $', (unitPrice * quantity).toFixed(2)]] : []),
            ].map(([label, value]) => (
              <div key={label}>
                <div className="text-gray-400">{label}</div>
                <div className={`${label.startsWith('Profit') ? colorClass : 'text-white'} font-semibold`}>
                  {typeof value === 'number' ? `$${value.toFixed(2)}` : value}
                </div>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="mt-6 flex justify-end gap-4">
            <button onClick={onClose} className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 text-sm">
              Close
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
