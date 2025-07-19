// File: app/cpq-demo/components/ComponentRow.tsx

import React from 'react';
import { Listbox } from '@headlessui/react';
import { CPQComponent, iconOptions } from './models';
import { computePricing } from './pricing';

type Props = {
  component: CPQComponent;
  isManagerView: boolean;
  updateComponent: (
    id: string,
    field: keyof Omit<CPQComponent, 'id' | 'optional'>,
    value: string | number | React.ComponentType<{ className?: string }>
  ) => void;
  toggleComponent: (id: string) => void;
  removeComponent: (id: string) => void;
  marginPercent: number;
  markupPercent: number;
  discountPercent: number;
};

export default function ComponentRow({
  component: comp,
  isManagerView,
  updateComponent,
  toggleComponent,
  removeComponent,
  marginPercent,
  markupPercent,
  discountPercent,
}: Props) {
  const { unitPrice, profit, profitPercent } = computePricing(comp, {
    marginPercent,
    markupPercent,
    discountPercent,
  });

  return (
    <div className="flex items-center py-2 text-white text-[11px] sm:text-sm">
      {/* NAME + ICON */}
      <div className="flex-[2] flex items-center gap-2 px-1 sm:px-2">
        {isManagerView ? (
          <>
            <input
              type="text"
              value={comp.name}
              onChange={(e) => updateComponent(comp.id, 'name', e.target.value)}
              className="bg-gray-700/50 border border-gray-600 text-white rounded px-1 py-1 text-[10px] sm:text-xs focus:outline-none w-full"
            />
            <Listbox
              value={iconOptions.find((opt) => opt.Icon === comp.Icon)}
              onChange={(selected) => updateComponent(comp.id, 'Icon', selected.Icon)}
            >
              <Listbox.Button className="bg-gray-700/50 border border-gray-600 text-white rounded px-1 py-1 text-[10px] sm:text-xs focus:outline-none">
                <comp.Icon className="inline-block text-[#05c8fb] w-4 h-4 mr-1" />
                {iconOptions.find((opt) => opt.Icon === comp.Icon)?.label || 'Icon'}
              </Listbox.Button>
              <Listbox.Options className="absolute mt-1 bg-gray-800 border border-gray-600 rounded z-10">
                {iconOptions.map((opt) => (
                  <Listbox.Option
                    key={opt.id}
                    value={opt}
                    className="cursor-pointer px-2 py-1 hover:bg-gray-700"
                  >
                    <opt.Icon className="inline-block text-[#05c8fb] w-4 h-4 mr-1" />
                    {opt.label}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Listbox>
          </>
        ) : (
          <>
            <comp.Icon className="text-[#05c8fb] w-4 h-4 flex-shrink-0" />
            <span className="font-medium">{comp.name}</span>
          </>
        )}
      </div>

      {/* LABOR COST / PRICE */}
      <div className="flex-[1] flex justify-center px-1 sm:px-2">
        {isManagerView ? (
          <input
            type="number"
            min={0}
            step={1}
            value={comp.unitLaborCost}
            onChange={(e) => updateComponent(comp.id, 'unitLaborCost', parseFloat(e.target.value) || 0)}
            className="w-12 sm:w-16 bg-gray-700/50 border border-gray-600 text-white rounded px-1 py-[2px] text-[10px] sm:text-xs focus:outline-none"
          />
        ) : (
          <span className="text-[#05c8fb]">${unitPrice.toFixed(2)}</span>
        )}
      </div>

      {isManagerView && (
        <>
          {/* HOURS */}
          <div className="flex-[1] flex justify-center px-1 sm:px-2">
            <input
              type="number"
              min={0}
              step={0.5}
              value={comp.laborHours}
              onChange={(e) => updateComponent(comp.id, 'laborHours', parseFloat(e.target.value) || 0)}
              className="w-12 sm:w-16 bg-gray-700/50 border border-gray-600 text-white rounded px-1 py-[2px] text-[10px] sm:text-xs focus:outline-none"
            />
          </div>

          {/* MATERIAL COST */}
          <div className="flex-[1] flex justify-center px-1 sm:px-2">
            <input
              type="number"
              min={0}
              step={1}
              value={comp.unitMaterialCost}
              onChange={(e) => updateComponent(comp.id, 'unitMaterialCost', parseFloat(e.target.value) || 0)}
              className="w-12 sm:w-16 bg-gray-700/50 border border-gray-600 text-white rounded px-1 py-[2px] text-[10px] sm:text-xs focus:outline-none"
            />
          </div>

          {/* UNIT PRICE */}
          <div className="flex-[1] flex justify-center px-1 sm:px-2">
            <span className="text-[#05c8fb]">${unitPrice.toFixed(2)}</span>
          </div>

          {/* PROFIT */}
          <div className="flex-[1] flex justify-center px-1 sm:px-2">
            <span className={`${profit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              ${profit.toFixed(2)}
            </span>
          </div>

          {/* PROFIT % */}
          <div className="flex-[1] flex justify-center px-1 sm:px-2">
            <span className={`${profitPercent >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {profitPercent.toFixed(1)}%
            </span>
          </div>

          {/* REMOVE BUTTON */}
          <div className="flex-[0.5] flex justify-center px-1 sm:px-2">
            <button
              onClick={() => removeComponent(comp.id)}
              className="text-red-500 hover:text-red-400 text-xs"
            >
              ✕
            </button>
          </div>
        </>
      )}

      {/* TOGGLE + QUANTITY */}
      <div className="flex-[1] flex justify-center px-1 sm:px-2">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={comp.quantity > 0}
            onChange={() => toggleComponent(comp.id)}
            className="h-4 w-4 sm:h-5 sm:w-5 text-[#05c8fb] bg-gray-700/50 border border-gray-600 rounded focus:ring-[#05c8fb]"
          />
        </label>
      </div>

      <div className="flex-[1] flex justify-center px-1 sm:px-2">
        {comp.quantity > 0 ? (
          <input
            type="number"
            min={1}
            value={comp.quantity}
            onChange={(e) => updateComponent(comp.id, 'quantity', parseInt(e.target.value) || 1)}
            className="w-12 sm:w-16 bg-gray-700/50 border border-gray-600 text-white rounded px-1 py-[2px] text-[10px] sm:text-xs focus:outline-none"
          />
        ) : (
          <span className="opacity-50">—</span>
        )}
      </div>
    </div>
  );
}
