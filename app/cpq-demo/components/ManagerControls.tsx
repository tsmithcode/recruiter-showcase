import React from 'react';

type Props = {
  onAddComponent: () => void;
  onClearAll: () => void;
  onLoadSeedData: (dataset: string) => void;
  selectedDataset: string;
  onSelectDataset: (dataset: string) => void;
};

export default function ManagerControls({
  onAddComponent,
  onClearAll,
  onLoadSeedData,
  selectedDataset,
  onSelectDataset,
}: Props) {
  const datasets = [
    { id: 'software', name: 'Software sales / B2B tools' },
    { id: 'construction', name: 'Construction and infrastructure' },
    { id: 'etoCad', name: 'Engineer-to-order CAD' },
    { id: 'medical', name: 'Medical education assets' },
    { id: 'aerospace', name: 'Aerospace and defense' },
    { id: 'automotive', name: 'Automotive and EV' },
    { id: 'banking', name: 'Banking operations' },
    { id: 'biotech', name: 'Healthcare and biotech' },
    { id: 'energy', name: 'Energy and utilities' },
    { id: 'film', name: 'Film and media' },
    { id: 'music', name: 'Music and media packaging' },
    { id: 'realEstate', name: 'Real estate and property marketing' },
  ];

  const handleLoadSeedData = () => {
    if (
      !confirm(
        `Are you sure you want to load seed data for "${selectedDataset}"? This will replace current components.`
      )
    ) {
      return;
    }

    try {
      onLoadSeedData(selectedDataset);
    } catch (err) {
      console.error('Load seed data error:', err);
      alert('An error occurred while loading seed data.');
    }
  };

  return (
    <div className="mb-6 mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      {/* Left Side: Dropdown + Load Button */}
      <div className="flex flex-col gap-2 sm:flex-row">
        <select
          className="w-full sm:w-72 px-4 py-3 rounded-md bg-gray-800 text-white border border-gray-700 text-base 
                     focus:outline-none focus:ring-2 focus:ring-[#05c8fb] shadow-sm"
          value={selectedDataset}
          onChange={(e) => onSelectDataset(e.target.value)}
          aria-label="Select Data Set"
        >
          {datasets.map((ds) => (
            <option key={ds.id} value={ds.id}>
              {ds.name}
            </option>
          ))}
        </select>

        <button
          onClick={handleLoadSeedData}
          className="min-h-11 px-4 py-3 rounded-md bg-gray-800 text-white border border-gray-700 text-sm
                     hover:bg-gray-700 hover:text-green-300 transition-colors shadow-sm"
          aria-label="Load Seed Data"
        >
          Load Mock Data
        </button>
      </div>

      {/* Right Side: Add & Clear Buttons */}
      <div className="flex w-full justify-end md:w-auto">
        <div className="flex w-full divide-x divide-gray-600 overflow-hidden rounded border border-gray-700 bg-gray-800/70 shadow-sm md:w-auto">
          <button
            onClick={() => {
              try {
                onAddComponent();
              } catch (err) {
                console.error('Add component error:', err);
                alert('An error occurred while adding a new component.');
              }
            }}
            className="min-h-11 flex-1 px-4 py-2 text-sm text-white transition-colors hover:bg-gray-700 hover:text-[#05c8fb]"
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
            className="min-h-11 flex-1 px-4 py-2 text-sm text-white transition-colors hover:bg-gray-700 hover:text-yellow-300"
            aria-label="Clear All Components"
          >
            Clear All
          </button>
        </div>
      </div>
    </div>
  );
}
