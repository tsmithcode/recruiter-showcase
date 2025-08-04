import React from 'react';
import { Listbox } from '@headlessui/react';
import { CPQComponent, iconOptions } from '../models';

type ComponentInputsProps = {
  comp: CPQComponent;
  onUpdate: (
    id: string,
    field: keyof CPQComponent,
    value: string | number | React.ComponentType<{ className?: string }>
  ) => void;
};

export const ComponentInputs: React.FC<ComponentInputsProps> = ({ comp, onUpdate }) => {
  const {
    id,
    name,
    Icon,
    quantity,
    discountPercent,
    unitMaterialCost,
    unitLaborCost,
    materialMarkupPercent,
    laborMarginPercent,
    laborHours,
  } = comp;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
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

      {/* Labor Hours */}
      <label className="flex flex-col">
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
  );
};
