// File: app/cpq-demo/components/ComponentTableHeader.tsx
import React from 'react';

type Props = {
  mode: 'customer' | 'manager';
};

export default function ComponentTableHeader({ mode }: Props) {
  const isCustomer = mode === 'customer';

  return (
    <div className="mb-2 hidden max-w-screen-lg border-b border-white/20 pb-1 text-[10px] uppercase tracking-wide text-gray-300 sm:flex sm:text-xs">
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
