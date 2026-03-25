// File: app/cpq-demo/components/TotalFooter.tsx

import React from 'react';
import { CPQComponent } from '../models';
import { computePricing } from '../pricing';

type Props = {
  components: CPQComponent[];
  onOpenQuote: () => void;
};

export default function TotalFooter({ components, onOpenQuote }: Props) {
  const items = components.filter((c) => c.quantity > 0);
  const totals = items.reduce(
    (acc, c) => {
      const { unitPrice, profit } = computePricing(c);
      acc.cost += (c.unitLaborCost + c.unitMaterialCost) * c.quantity;
      acc.revenue += unitPrice * c.quantity;
      acc.profit += profit * c.quantity;
      return acc;
    },
    { cost: 0, revenue: 0, profit: 0 }
  );

  return (
    <div className="mt-4 flex flex-col gap-4 border-t border-white/20 pt-4 text-sm text-white md:flex-row md:items-end md:justify-between">
      <div className="flex gap-8">
        <div className="flex-1">
          <div className="text-gray-400">Total Revenue</div>
          <div className="font-semibold">${totals.revenue.toFixed(2)}</div>
        </div>
        <div className="flex-1">
          <div className="text-gray-400">Total Profit</div>
          <div className={`font-semibold ${totals.profit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            ${totals.profit.toFixed(2)}
          </div>
        </div>
      </div>

      <button
        onClick={onOpenQuote}
        className="inline-flex items-center justify-center rounded-full bg-[#05c8fb] px-5 py-2.5 font-semibold text-black transition hover:opacity-90"
      >
        Generate quote receipt
      </button>
    </div>
  );
}
