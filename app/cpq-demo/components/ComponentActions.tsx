import React from 'react';
import { CPQComponent } from '../models';

type ComponentActionsProps = {
  comp: CPQComponent;
  clearFields: (keyof CPQComponent)[];
  seed?: Partial<CPQComponent>;
  onUpdate: (
    id: string,
    field: keyof CPQComponent,
    value: string | number | React.ComponentType<{ className?: string }>
  ) => void;
  onDelete: (id: string) => void;
  onClose: () => void;
};

export const ComponentActions: React.FC<ComponentActionsProps> = ({
  comp,
  clearFields,
  seed,
  onUpdate,
  onDelete,
  onClose,
}) => {
  const { id, name } = comp;

  return (
    <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap gap-4">
        {/* Clear Data */}
        <button
          onClick={() => {
            if (!confirm('Are you sure you want to clear all data for this component?')) return;
            try {
              clearFields.forEach(field => {
                const isString = typeof comp[field] === 'string';
                onUpdate(id, field, (isString ? '' : 0) as string | number);
              });
            } catch (err) {
              console.error('Clear error:', err);
              alert('An error occurred while clearing data.');
            }
          }}
          className="min-h-11 rounded bg-gray-700 px-4 py-2 text-sm hover:bg-gray-600 hover:text-yellow-300"
        >
          Clear Data
        </button>

        {/* Load Seed Data */}
        <button
          onClick={() => {
            if (!seed) {
              alert('No seed data available for this component.');
              return;
            }
            if (!confirm('Are you sure you want to load the seed (mock/fake) values?')) return;
            try {
              Object.entries(seed).forEach(([field, value]) => {
                if (field === 'id' || field === 'optional') return;
                onUpdate(id, field as keyof CPQComponent, value as string | number);
              });
            } catch (err) {
              console.error('Seed load error:', err);
              alert('An error occurred while loading seed data.');
            }
          }}
          className="min-h-11 rounded bg-gray-700 px-4 py-2 text-sm hover:bg-gray-600"
        >
          Load Seed Data
        </button>

        {/* Delete */}
        <button
          onClick={() => {
            if (!confirm(`Are you sure you want to delete "${name}"?`)) return;
            try {
              onDelete(id);
              onClose();
            } catch (err) {
              console.error('Delete error:', err);
              alert('An error occurred while deleting this component.');
            }
          }}
          className="min-h-11 rounded bg-gray-700 px-4 py-2 text-sm text-red-300 hover:bg-gray-600"
        >
          Delete
        </button>
      </div>

      <div className="flex-shrink-0">
        <button
          onClick={onClose}
          className="min-h-11 rounded bg-gray-700 px-4 py-2 text-sm hover:bg-gray-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};
