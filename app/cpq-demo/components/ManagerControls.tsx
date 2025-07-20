// File: app/cpq-demo/components/ManagerControls.tsx

import React from 'react';

type Props = {
  onAddComponent: () => void;
};

export default function ManagerControls({ onAddComponent }: Props) {
  return (
    <div className="mb-4 flex justify-end">
      <button
        onClick={onAddComponent}
        className="bg-[#05c8fb] text-[#0b253f] px-4 py-2 rounded text-sm hover:opacity-90 transition"
      >
        + Add Component
      </button>
    </div>
  );
}
