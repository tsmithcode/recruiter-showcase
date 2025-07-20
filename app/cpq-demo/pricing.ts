// File: app/cpq-demo/pricing.ts

import type { CPQComponent } from './models';

export function computePricing(comp: CPQComponent) {
  // Base costs
  const laborCost = comp.unitLaborCost * comp.laborHours;
  const materialCost = comp.unitMaterialCost;

  // Margins & markups (dollars)
  const laborMarginDollars = laborCost * (comp.laborMarginPercent / 100);
  const materialMarkupDollars = materialCost * (comp.materialMarkupPercent / 100);

  // Subtotal before discount
  const subtotal = laborCost + materialCost + laborMarginDollars + materialMarkupDollars;

  // Discount (dollars)
  const discountDollars = subtotal * (comp.discountPercent / 100);

  // Final unit price
  const unitPrice = subtotal - discountDollars;

  // Profit = unitPrice – (laborCost + materialCost)
  const profit = unitPrice - (laborCost + materialCost);
  const profitPercent = (profit / (laborCost + materialCost)) * 100;

  // Total gross margin dollars & percent
  const grossMarginDollars = profit;
  const grossMarginPercent = profitPercent;

  return {
    laborCost,
    materialCost,
    laborMarginDollars,
    materialMarkupDollars,
    discountDollars,
    unitPrice,
    profit,
    profitPercent,
    grossMarginDollars,
    grossMarginPercent,
  };
}
