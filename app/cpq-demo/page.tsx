// File: app/cpq-demo/page.tsx

'use client';

import React from 'react';
import { useCpqController } from './useCpqController';
import CPQHeader from './CPQHeader';
import ManagerControls from './ManagerControls';
import ComponentRow from './ComponentRow';
import QuoteModal from './QuoteModal';
import TotalFooter from './TotalFooter';
import ComponentTableHeader from './ComponentTableHeader';

export default function CPQAdvanced() {
  const controller = useCpqController();

  return (
    <>
      <div className="mt-6 bg-white/5 border border-white/10 p-4 sm:p-6 rounded-xl mx-6">
        <CPQHeader
          isManagerView={controller.isManagerView}
          setIsManagerView={controller.setIsManagerView}
        />

        {controller.isManagerView && (
          <ManagerControls
            marginPercent={controller.marginPercent}
            markupPercent={controller.markupPercent}
            discountPercent={controller.discountPercent}
            setMarginPercent={controller.setMarginPercent}
            setMarkupPercent={controller.setMarkupPercent}
            setDiscountPercent={controller.setDiscountPercent}
            onAddComponent={controller.addComponent}
          />
        )}

       <ComponentTableHeader isManagerView={controller.isManagerView} />


        <div className="divide-y divide-white/20">
          {controller.components.map(comp => (
            <ComponentRow
              key={comp.id}
              component={comp}
              isManagerView={controller.isManagerView}
              updateComponent={controller.updateComponent}
              toggleComponent={controller.toggleComponent}
              removeComponent={controller.removeComponent}
              marginPercent={controller.marginPercent}
              markupPercent={controller.markupPercent}
              discountPercent={controller.discountPercent}
            />
          ))}
        </div>
            
        <TotalFooter
          totalPrice={controller.totalPrice}
          isManagerView={controller.isManagerView}
          onGenerateQuote={controller.openReceiptModal}
        />
      </div>

      <QuoteModal
        isOpen={controller.isModalOpen}
        receiptText={controller.receiptText}
        onClose={() => controller.setIsModalOpen(false)}
      />
    </>
  );
}
