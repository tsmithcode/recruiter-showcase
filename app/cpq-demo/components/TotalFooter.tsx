// File: app/cpq-demo/components/TotalFooter.tsx

import React from 'react';
import { CPQComponent } from '../models';
import { computePricing } from '../pricing';

type Props = {
  components: CPQComponent[];
};

export default function TotalFooter({ components }: Props) {
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
   <div
  className="mt-4 border-t border-white/20 pt-2 text-white text-sm
             flex justify-between gap-4 flex-row"
>
  <div className="flex-1">
    <div className="text-gray-400">Total Revenue</div>
    <div className="font-semibold">${totals.revenue.toFixed(2)}</div>
  </div>
  <div className="flex-1 text-right">
    <div className="text-gray-400">Total Profit</div>
    <div
      className={`font-semibold ${
        totals.profit >= 0 ? 'text-green-400' : 'text-red-400'
      }`}
    >
      ${totals.profit.toFixed(2)}
    </div>
  </div>
</div>

  );
}
