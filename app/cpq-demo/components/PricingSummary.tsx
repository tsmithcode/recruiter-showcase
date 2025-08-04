import React from 'react';
import { motion } from 'framer-motion';

interface PricingSummaryProps {
  laborCost: number;
  materialCost: number;
  laborMarginDollars: number;
  materialMarkupDollars: number;
  discountPercent: number;
  discountDollars: number;
  unitPrice: number;
  profit: number;
  profitPercent: number;
  quantity: number;
  colorClass?: string; // optional text color class for profit
}

export const PricingSummary: React.FC<PricingSummaryProps> = ({
  laborCost,
  materialCost,
  laborMarginDollars,
  materialMarkupDollars,
  discountPercent,
  discountDollars,
  unitPrice,
  profit,
  profitPercent,
  quantity,
  colorClass = 'text-green-400',
}) => {
  return (
    <>
      <h3 className="mb-2 text-lg text-[#05c8fb] mt-6">Pricing Summary</h3>
      <motion.div
        className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div>
          <div className="text-gray-400">Labor Cost $</div>
          <div className="font-semibold">${laborCost.toFixed(2)}</div>
        </div>
        <div>
          <div className="text-gray-400">Material Cost $</div>
          <div className="font-semibold">${materialCost.toFixed(2)}</div>
        </div>
        <div>
          <div className="text-gray-400">Subtotal $</div>
          <div className="font-semibold">${(laborCost + materialCost).toFixed(2)}</div>
        </div>
        <div>
          <div className="text-gray-400">Labor Price $</div>
          <div className="font-semibold">${(laborCost + laborMarginDollars).toFixed(2)}</div>
        </div>
        <div>
          <div className="text-gray-400">Material Price $</div>
          <div className="font-semibold">${(materialCost + materialMarkupDollars).toFixed(2)}</div>
        </div>
        <div>
          <div className="text-gray-400">Discount (% / $)</div>
          <div className="font-semibold">
            {discountPercent}% / -${discountDollars.toFixed(2)}
          </div>
        </div>
        <div>
          <div className="text-gray-400">Unit Price $</div>
          <div className="font-semibold">${unitPrice.toFixed(2)}</div>
        </div>
        <div>
          <div className="text-gray-400">Profit $ / %</div>
          <div className={`${colorClass} font-semibold`}>
            ${profit.toFixed(2)} / {profitPercent.toFixed(1)}%
          </div>
        </div>
        {quantity > 1 && (
          <div>
            <div className="text-gray-400">Line Total $</div>
            <div className="font-semibold">${(unitPrice * quantity).toFixed(2)}</div>
          </div>
        )}
      </motion.div>
    </>
  );
};
