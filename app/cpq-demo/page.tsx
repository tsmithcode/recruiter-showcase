'use client';

import React, { useState } from 'react';
import { useCpqController } from './useCpqController';
import CPQHeader from './components/CPQHeader';
import ManagerControls from './components/ManagerControls';
import ComponentTableHeader from './components/ComponentTableHeader';
import ComponentRow from './components/ComponentRow';
import ComponentEditModal from './components/ComponentEditModal';
import TotalFooter from './components/TotalFooter';
import QuoteModal from './components/QuoteModal';

export default function CPQAdvanced() {
  const controller = useCpqController();
  const [mode, setMode] = useState<'customer' | 'manager'>('customer');

  return (
    <>
      <div className="mx-auto max-w-screen-lg bg-white/5 border border-white/10 p-4  rounded-xl">
         <CPQHeader onModeChange={setMode} />

        <ManagerControls
          onAddComponent={controller.addComponent}
          onClearAll={controller.clearAll}
          onLoadSeedData={controller.loadSeedData}
        />

        {/* Table Header */}
         <ComponentTableHeader mode={mode} />

        {/* Table Rows */}
        <div className="divide-y divide-white/20">
          {controller.components.map(c => (
            <ComponentRow
              key={c.id}
              component={c}
              openEditModal={controller.openEditModal}
              toggleInclude={controller.toggleInclude}
              updateComponent={controller.updateComponent}
              removeComponent={controller.removeComponent}
              mode={mode} // <-- Pass down mode from state
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
