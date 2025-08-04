import React, { useState } from 'react';

type Props = {
  onAddComponent: () => void;
  onClearAll: () => void;
  onLoadSeedData: (dataset: string) => void; // <-- Accept selected dataset
};

export default function ManagerControls({
  onAddComponent,
  onClearAll,
  onLoadSeedData,
}: Props) {
  const [selectedDataset, setSelectedDataset] = useState('');

  const datasets = [
    { id: 'none', name: 'N/A' },
    { id: 'aerospace', name: 'Aerospace & Defense Components' },
    { id: 'automotive', name: 'Automotive & EV Components' },
    { id: 'banking', name: 'Banking Components' },
    { id: 'biotech', name: 'Healthcare & Biotech Components' },
    { id: 'construction', name: 'Construction & Infrastructure Components' },
    { id: 'energy', name: 'Energy Components' },
    { id: 'etoCad', name: 'ETO CAD Components' },
    { id: 'film', name: 'Film Components' },
    { id: 'medical', name: 'Medical Components' },
    { id: 'music', name: 'Music Album Components' },
    { id: 'realEstate', name: 'Real Estate Components' },
    { id: 'software', name: 'Software Sales Components' },
  ];

  const handleLoadSeedData = () => {
    if (!selectedDataset || selectedDataset === 'none') {
      alert('Please select a valid dataset before loading seed data.');
      return;
    }

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
    <div className="mb-6 mt-6 flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
      {/* Left Side: Dropdown + Load Button */}
      <div className="flex flex-col items-center space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
        <select
          className="w-72 px-4 py-3 rounded-md bg-gray-800 text-white border border-gray-700 text-sm 
                     focus:outline-none focus:ring-2 focus:ring-[#05c8fb] shadow-sm"
          value={selectedDataset}
          onChange={(e) => setSelectedDataset(e.target.value)}
          aria-label="Select Data Set"
        >
          <option value="" disabled>
            Select Data Set...
          </option>
          {datasets.map((ds) => (
            <option key={ds.id} value={ds.id}>
              {ds.name}
            </option>
          ))}
        </select>

        <button
          onClick={handleLoadSeedData}
          className="px-4 py-3 rounded-md bg-gray-800 text-white border border-gray-700 text-sm
                     hover:bg-gray-700 hover:text-green-300 transition-colors shadow-sm"
          aria-label="Load Seed Data"
        >
          Load Mock Data
        </button>
      </div>

      {/* Right Side: Add & Clear Buttons */}
      <div className="flex justify-end w-full md:w-auto">
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
        </div>
      </div>
    </div>
  );
}
