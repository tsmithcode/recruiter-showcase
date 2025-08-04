// File: app/cpq-demo/components/ComponentTableHeader.tsx
import React from 'react';

type Props = {
  mode: 'customer' | 'manager';
};

export default function ComponentTableHeader({ mode }: Props) {
  const isCustomer = mode === 'customer';

  return (
    <div className="flex text-gray-300 text-[10px] sm:text-xs uppercase tracking-wide mb-2 border-b border-white/20 pb-1 max-w-screen-lg mx-auto">
      <div className="flex-[2] px-1 sm:px-2">Component</div>
      <div className="flex-[1] text-center px-1 sm:px-2">Unit Price</div>
      <div className="flex-[1] text-center px-1 sm:px-2">Include</div>
      <div className="flex-[1] text-center px-1 sm:px-2">Quantity</div>
      {!isCustomer && (
        <>
          <div className="flex-[1] text-center px-1 sm:px-2">Edit</div>
          <div className="flex-[1] text-center px-1 sm:px-2">Delete</div>
        </>
      )}
    </div>
  );
}
