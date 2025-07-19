// File: app/cpq-demo/useCpqController.ts

'use client';

import { useState } from 'react';
import { CPQComponent, initialCPQComponents } from './models';
import { computePricing } from './pricing';

export function useCpqController() {
  const [components, setComponents] = useState<CPQComponent[]>(initialCPQComponents);
  const [isManagerView, setIsManagerView] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [receiptText, setReceiptText] = useState('');

  const [marginPercent, setMarginPercent] = useState(80);
  const [markupPercent, setMarkupPercent] = useState(200);
  const [discountPercent, setDiscountPercent] = useState(5);

  const updateComponent = (
    id: string,
    field: keyof Omit<CPQComponent, 'id' | 'optional'>,
    value: string | number | React.ComponentType<{ className?: string }>
  ) => {
    setComponents(prev =>
      prev.map(comp => (comp.id === id ? { ...comp, [field]: value } : comp))
    );
  };

  const toggleComponent = (id: string) => {
    setComponents(prev =>
      prev.map(comp =>
        comp.id === id ? { ...comp, quantity: comp.quantity > 0 ? 0 : 1 } : comp
      )
    );
  };

  const addComponent = () => {
    const newId = `new-${Date.now()}`;
    setComponents(prev => [
      ...prev,
      {
        id: newId,
        name: '',
        unit: 'per unit',
        unitLaborCost: 50,
        laborHours: 1,
        unitMaterialCost: 0,
        quantity: 0,
        optional: true,
        Icon: prev[0]?.Icon || (() => null),
      },
    ]);
  };

  const removeComponent = (id: string) => {
    setComponents(prev => prev.filter(comp => comp.id !== id));
  };

  const totalPrice = components.reduce((sum, comp) => {
    const { unitPrice } = computePricing(comp, { marginPercent, markupPercent, discountPercent });
    return sum + unitPrice * comp.quantity;
  }, 0);

  const openReceiptModal = () => {
    const selected = components.filter(c => c.quantity > 0);
    let receipt = `CPQ Demo Receipt\n\nYou have configured the following:\n\n`;
    selected.forEach(item => {
      const { unitPrice, profit } = computePricing(item, { marginPercent, markupPercent, discountPercent });
      const lineTotal = (unitPrice * item.quantity).toFixed(2);
      receipt += `• ${item.name}: ${item.quantity} × $${unitPrice.toFixed(2)} = $${lineTotal}  (profit $${profit.toFixed(2)})\n`;
    });
    receipt += `\nGrand Total: $${totalPrice.toFixed(2)}\n\n——\nThank you for using this CPQ tool demo!`;
    setReceiptText(receipt);
    setIsModalOpen(true);
  };

  return {
    components,
    isManagerView,
    isModalOpen,
    receiptText,
    marginPercent,
    markupPercent,
    discountPercent,
    setIsManagerView,
    setIsModalOpen,
    setMarginPercent,
    setMarkupPercent,
    setDiscountPercent,
    updateComponent,
    toggleComponent,
    addComponent,
    removeComponent,
    openReceiptModal,
    totalPrice,
  };
}
