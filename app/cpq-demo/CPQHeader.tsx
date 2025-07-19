// File: app/cpq-demo/components/CPQHeader.tsx

import React from 'react';
import { Switch } from '@headlessui/react';

type Props = {
  isManagerView: boolean;
  setIsManagerView: (val: boolean) => void;
};

export default function CPQHeader({ isManagerView, setIsManagerView }: Props) {
  return (
    <header className="mb-6 flex flex-col items-start justify-between gap-4">
      <div>
        <h2 className="text-3xl sm:text-4xl font-bold text-white">
          CPQ Tool <span className="text-[#05c8fb]">Demo</span>
        </h2>
        <p className="mt-1 text-gray-300 text-xs sm:text-sm">
          Learn how this configurator turns your legacy code into a revenue stream—auto-configuring live quotes, dynamic pricing, and profit analysis.
        </p>
        <details className="mt-2 text-gray-400 text-xs sm:text-sm [&_summary]:cursor-pointer [&_summary]:text-[#05c8fb]">
          <summary className="mt-1 inline-block">Read more</summary>
          <div className="mt-2 space-y-2">
            <p>
              CPQ = Configure–Price–Quote. Each software asset (code, PDF, image, etc.) is a monetizable component.
            </p>
            <p>
              Manager can: rename a component, pick an icon, set labor & material cost, and apply global margin/markup/discount. The system calculates a customer-facing unit price and profit.
            </p>
            <p>
              Customer can only choose which components and quantities, then see final price and request a quote.
            </p>
          </div>
        </details>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-400">
          {isManagerView ? 'Manager CPQ View' : 'Customer CPQ View'}
        </span>
        <Switch
          checked={isManagerView}
          onChange={setIsManagerView}
          className={`${
            isManagerView ? 'bg-[#05c8fb]' : 'bg-gray-400/40'
          } relative inline-flex h-5 w-10 items-center rounded-full transition-colors focus:outline-none`}
        >
          <span className="sr-only">Toggle View</span>
          <span
            className={`${
              isManagerView ? 'translate-x-5' : 'translate-x-0.5'
            } inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform`}
          />
        </Switch>
      </div>

      <div className="w-full mt-3">
        <p className="text-gray-300 text-xs sm:text-sm">
          {isManagerView
            ? 'Edit component details, costs, and global margin/markup/discount to adjust profitability. View on desktop screen for best UX.'
            : 'Select components and quantities to see live pricing and generate a personalized quote.'}
        </p>
      </div>
    </header>
  );
}
