// File: app/cpq-demo/components/TotalFooter.tsx

import React from 'react';

type Props = {
  totalPrice: number;
  isManagerView: boolean;
  onGenerateQuote: () => void;
};

export default function TotalFooter({ totalPrice, isManagerView, onGenerateQuote }: Props) {
  return (
    <div className="mt-4 flex flex-col sm:flex-row items-center sm:justify-between gap-2 pt-2 border-t border-white/20">
      <div className="text-white font-semibold text-lg">
        Grand Total: <span className="text-green-400">${totalPrice.toFixed(2)}</span>
      </div>

      {!isManagerView && (
        <button
          onClick={onGenerateQuote}
          className="bg-[#05c8fb] text-[#0b253f] text-base font-semibold rounded-full px-6 py-2 shadow transition hover:bg-[#05c8fb]/90"
        >
          Generate Quote
        </button>
      )}
    </div>
  );
}
