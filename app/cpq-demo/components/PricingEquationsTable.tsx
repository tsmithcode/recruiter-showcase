import React from 'react';

interface PricingEquationsTableProps {
  quantity: number;
}

export const PricingEquationsTable: React.FC<PricingEquationsTableProps> = ({ quantity }) => {
  return (
    <div className="relative inline-block overflow-auto shadow-lg sm:rounded-lg mt-6 border-[#05c8fb]">
      <table className="table-auto text-left text-blue-100 bg-blue-600 text-xs">
        <thead className="bg-[#00417d] uppercase">
          <tr>
            <th scope="col" className="px-3 py-1">Metric</th>
            <th scope="col" className="px-3 py-1">Formula</th>
          </tr>
        </thead>
        <tbody className="bg-[#00264a] divide-y divide-[#05c8fb]/50 leading-tight">
          <tr className="hover:bg-[#373f46]">
            <td className="px-3 py-1 font-medium">Labor Cost</td>
            <td className="px-3 py-1">
              Hourly Labor Rate<span className="px-1 text-[#05c8fb]">×</span>Hours Worked
            </td>
          </tr>
          <tr className="hover:bg-[#373f46]">
            <td className="px-3 py-1 font-medium">Material Cost</td>
            <td className="px-3 py-1">
              Unit Material Cost<span className="px-1 text-[#05c8fb]">×</span>Quantity
            </td>
          </tr>
          <tr className="hover:bg-[#373f46]">
            <td className="px-3 py-1 font-medium">Subtotal</td>
            <td className="px-3 py-1">
              Labor Cost<span className="px-1 text-[#05c8fb]">+</span>Material Cost
            </td>
          </tr>
          <tr className="hover:bg-[#373f46]">
            <td className="px-3 py-1 font-medium">Labor Price</td>
            <td className="px-3 py-1">
              Labor Cost<span className="px-1 text-[#05c8fb]">+</span>Labor Margin
            </td>
          </tr>
          <tr className="hover:bg-[#373f46]">
            <td className="px-3 py-1 font-medium">Material Price</td>
            <td className="px-3 py-1">
              Material Cost<span className="px-1 text-[#05c8fb]">+</span>Material Markup
            </td>
          </tr>
          <tr className="hover:bg-[#373f46]">
            <td className="px-3 py-1 font-medium">Discount</td>
            <td className="px-3 py-1">
              Unit Price<span className="px-1 text-[#05c8fb]">×</span>(Discount%<span className="px-1 text-[#05c8fb]">/</span>100)
            </td>
          </tr>
          <tr className="hover:bg-[#373f46]">
            <td className="px-3 py-1 font-medium">Unit Price</td>
            <td className="px-3 py-1">
              Labor Price<span className="px-1 text-[#05c8fb]">+</span>Material Price<span className="px-1 text-[#05c8fb]">−</span>Discount ($)
            </td>
          </tr>
          <tr className="hover:bg-[#373f46]">
            <td className="px-3 py-1 font-medium">Profit</td>
            <td className="px-3 py-1">
              Unit Price<span className="px-1 text-[#05c8fb]">−</span>(Labor Cost<span className="px-1 text-[#05c8fb]">+</span>Material Cost)
            </td>
          </tr>
          {quantity > 1 && (
            <tr className="hover:bg-[#373f46]">
              <td className="px-3 py-1 font-medium">Line Total</td>
              <td className="px-3 py-1">
                Unit Price<span className="px-1 text-[#05c8fb]">×</span>Quantity
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
