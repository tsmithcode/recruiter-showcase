// File: app/cpq-demo/pricing.ts

import { CPQComponent } from './models';

export function computePricing(
  comp: CPQComponent,
  master: {
    marginPercent: number;
    markupPercent: number;
    discountPercent: number;
  }
) {
  const laborCost = comp.unitLaborCost * comp.laborHours;
  const materialCost = comp.unitMaterialCost;

  const laborWithMargin = laborCost * (1 + master.marginPercent / 100);
  const materialWithMarkup = materialCost * (1 + master.markupPercent / 100);
  const rawTotal = laborWithMargin + materialWithMarkup;
  const discounted = rawTotal * (1 - master.discountPercent / 100);

  const costTotal = laborCost + materialCost;
  const profit = discounted - costTotal;
  const profitPercent = costTotal > 0 ? (profit / costTotal) * 100 : 0;

  return {
    unitPrice: discounted,
    profit,
    profitPercent,
  };
}
