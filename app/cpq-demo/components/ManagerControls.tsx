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
    <div className="mb-4 flex justify-end gap-2">
      <button
        onClick={() => {
          try {
            onAddComponent();
          } catch (err) {
            console.error('Add component error:', err);
            alert('An error occurred while adding a new component.');
          }
        }}
        className="bg-[#05c8fb] text-[#0b253f] px-4 py-2 rounded text-sm hover:opacity-90 transition"
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
        className="bg-yellow-400 text-[#0b253f] px-4 py-2 rounded text-sm hover:opacity-90 transition"
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
        className="bg-green-400 text-[#0b253f] px-4 py-2 rounded text-sm hover:opacity-90 transition"
        aria-label="Load Seed Data"
      >
        Load Seed Data
      </button>
    </div>
  );
}
