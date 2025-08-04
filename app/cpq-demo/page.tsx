'use client';

import React, { useState, useEffect } from 'react';
import { useCpqController } from './useCpqController';
import CPQHeader from './components/CPQHeader';
import ManagerControls from './components/ManagerControls';
import ComponentTableHeader from './components/ComponentTableHeader';
import ComponentRow from './components/ComponentRow';
import ComponentEditModal from './components/ComponentEditModal';
import TotalFooter from './components/TotalFooter';
import QuoteModal from './components/QuoteModal';
import CPQUserGuideDialog from '../cpq-demo/components/CPQUserGuideDialog';

// --- Import your dataset arrays ---
import {
  aerospaceComponents,
  automotiveComponents,
  bankingComponents,
  biotechComponents,
  constructionComponents,
  energyComponents,
  etoCadComponents,
  filmComponents,
  medicalComponents,
  musicAlbumComponents,
  realEstateComponents,
  softwareSalesComponents,
  CPQComponent
} from '../cpq-demo/models'; // adjust to your actual path


// Map dataset keys to arrays
const datasetsMap: Record<string, CPQComponent[]> = {
  aerospace: aerospaceComponents,
  automotive: automotiveComponents,
  banking: bankingComponents,
  biotech: biotechComponents,
  construction: constructionComponents,
  energy: energyComponents,
  etoCad: etoCadComponents,
  film: filmComponents,
  medical: medicalComponents,
  music: musicAlbumComponents,
  realEstate: realEstateComponents,
  software: softwareSalesComponents,
};

export default function CPQAdvanced() {
  const controller = useCpqController();
  const [mode, setMode] = useState<'customer' | 'manager'>('customer');

  // --- Default dataset ---
  const defaultDataset = 'medical';

  // Initialize with default dataset
  useEffect(() => {
    const initialData = datasetsMap[defaultDataset] || [];
    controller.setComponents(initialData);
  }, []);

  // Handle seed data loading dynamically
  const handleLoadSeedData = (dataset: string) => {
    const data = datasetsMap[dataset] || [];
    controller.setComponents(data);
  };

  return (
    <>
      <div className="mx-auto max-w-screen-lg bg-white/5 border border-white/10 p-4 rounded-xl">
       <CPQUserGuideDialog />
       
        <CPQHeader onModeChange={setMode} />

        <ManagerControls
          onAddComponent={controller.addComponent}
          onClearAll={controller.clearAll}
          onLoadSeedData={handleLoadSeedData} // <-- Pass dynamic loader
        />

        {/* Table Header */}
        <ComponentTableHeader mode={mode} />

        {/* Table Rows */}
        <div className="divide-y divide-white/20">
          {controller.components.map((c) => (
            <ComponentRow
              key={c.id}
              component={c}
              openEditModal={controller.openEditModal}
              toggleInclude={controller.toggleInclude}
              updateComponent={controller.updateComponent}
              removeComponent={controller.removeComponent}
              mode={mode}
            />
          ))}
        </div>

        {/* Footer Totals */}
        <TotalFooter components={controller.components} />

        {/* Quote Receipt Modal */}
        <QuoteModal
          isOpen={controller.isQuoteOpen}
          receiptText={controller.receiptText}
          onClose={controller.closeReceiptModal}
        />
      </div>

      {/* Per‑Row Edit Modal */}
      {controller.editingComponent && (
        <ComponentEditModal
          component={controller.editingComponent}
          onClose={controller.closeEditModal}
          onUpdate={controller.updateComponent}
          onDelete={controller.removeComponent}
        />
      )}
    </>
  );
}
