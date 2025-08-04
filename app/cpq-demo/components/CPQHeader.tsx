// File: app/cpq-demo/components/CPQHeader.tsx
import React, { useState } from 'react';

type Props = {
  onModeChange?: (mode: 'customer' | 'manager') => void;
};

export default function CPQHeader({ onModeChange }: Props) {
  const [viewMode, setViewMode] = useState<'customer' | 'manager'>('customer');

  const handleChange = (mode: 'customer' | 'manager') => {
    setViewMode(mode);
    onModeChange?.(mode);
  };

  return (
    <header className="text-center text-white py-4 border-b border-white/20 relative">
      <h1 className="text-2xl font-semibold">Configure Price Quote (CPQ)</h1>
      <p className="mt-1 text-sm text-[#05c8fb]/90 font-medium">
        The world’s first free digital asset CPQ tool for contractors.
      </p>

      {/* Larger Switch */}
      <div className="mt-3 flex justify-center">
        <div className="flex items-center bg-gray-800 border border-gray-600 rounded-full text-sm overflow-hidden">
          <button
            className={`px-4 py-1.5 transition-colors duration-200 ${
              viewMode === 'customer'
                ? 'bg-[#05c8fb] text-black'
                : 'text-gray-400 hover:text-white'
            }`}
            onClick={() => handleChange('customer')}
          >
            Customer
          </button>
          <button
            className={`px-4 py-1.5 transition-colors duration-200 ${
              viewMode === 'manager'
                ? 'bg-[#05c8fb] text-black'
                : 'text-gray-400 hover:text-white'
            }`}
            onClick={() => handleChange('manager')}
          >
            Manager
          </button>
        </div>
      </div>
    </header>
  );
}
