import React from 'react';

type Props = {
  onAddComponent: () => void;
  onClearAll: () => void;
  onLoadSeedData: () => void;
};

export default function ManagerControls({
  onAddComponent,
  onClearAll,
  onLoadSeedData,
}: Props) {
  return (
    <div className="mb-6 mt-6 flex justify-end">
  <div className="flex divide-x divide-gray-600 rounded overflow-hidden border border-gray-700 bg-gray-800/70 shadow-sm">
    <button
      onClick={() => {
        try {
          onAddComponent();
        } catch (err) {
          console.error('Add component error:', err);
          alert('An error occurred while adding a new component.');
        }
      }}
      className="px-4 py-2 text-xs text-white hover:bg-gray-700 hover:text-[#05c8fb] transition-colors"
      aria-label="Add Component"
    >
      + Add Component
    </button>

    <button
      onClick={() => {
        if (!confirm('Are you sure you want to clear all components?')) return;
        try {
          onClearAll();
        } catch (err) {
          console.error('Clear all error:', err);
          alert('An error occurred while clearing all components.');
        }
      }}
      className="px-4 py-2 text-xs text-white hover:bg-gray-700 hover:text-yellow-300 transition-colors"
      aria-label="Clear All Components"
    >
      Clear All
    </button>

    <button
      onClick={() => {
        if (!confirm('Are you sure you want to load seed data?')) return;
        try {
          onLoadSeedData();
        } catch (err) {
          console.error('Load seed data error:', err);
          alert('An error occurred while loading seed data.');
        }
      }}
      className="px-4 py-2 text-xs text-white hover:bg-gray-700 hover:text-green-300 transition-colors"
      aria-label="Load Seed Data"
    >
      Load Seed Data
    </button>
  </div>
</div>

  );
}
