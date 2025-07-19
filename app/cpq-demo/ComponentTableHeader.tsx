// File: app/cpq-demo/components/ComponentTableHeader.tsx

import React from 'react';

type Props = {
  isManagerView: boolean;
};

export default function ComponentTableHeader({ isManagerView }: Props) {
  return (
    <div className="flex text-gray-300 text-[10px] sm:text-xs uppercase tracking-wide mb-2 border-b border-white/20 pb-1">
      <div className="flex-[2] px-1 sm:px-2">Component</div>
      <div className="flex-[1] text-center px-1 sm:px-2">Labor Cost $/hr</div>
      {isManagerView && <div className="flex-[1] text-center px-1 sm:px-2">Hours</div>}
      {isManagerView && <div className="flex-[1] text-center px-1 sm:px-2">Material Cost $/unit</div>}
      {isManagerView && <div className="flex-[1] text-center px-1 sm:px-2">Unit Price</div>}
      {isManagerView && <div className="flex-[1] text-center px-1 sm:px-2">Profit $</div>}
      {isManagerView && <div className="flex-[1] text-center px-1 sm:px-2">Profit %</div>}
      {isManagerView && <div className="flex-[0.5] text-center px-1 sm:px-2">Remove</div>}
      <div className="flex-[1] text-center px-1 sm:px-2">Include</div>
      <div className="flex-[1] text-center px-1 sm:px-2">Quantity</div>
    </div>
  );
}
