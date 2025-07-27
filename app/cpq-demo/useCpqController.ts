// File: app/cpq-demo/useCpqController.ts

'use client';

import { useState } from 'react';
import {
  CPQComponent,
  initialCPQComponents,
  iconOptions,
} from './models';
import { computePricing } from './pricing';

export function useCpqController() {
  const [components, setComponents] = useState<CPQComponent[]>(initialCPQComponents);
  const [editingComponentId, setEditingComponentId] = useState<string | null>(null);
  const [isQuoteOpen, setIsQuoteOpen] = useState<boolean>(false);
  const [receiptText, setReceiptText] = useState<string>('');

  // Open/close the per‑row edit modal
  const openEditModal = (id: string) => setEditingComponentId(id);
  const closeEditModal = () => setEditingComponentId(null);

  // Add a brand‑new component
  const addComponent = () => {
    const newComp: CPQComponent = {
      id: `new-${Date.now()}`,
      name: '',
      unit: 'per unit',
      unitLaborCost: 0,
      laborHours: 0,
      unitMaterialCost: 0,
      quantity: 0,
      optional: true,
      Icon: iconOptions[0].Icon,
      laborMarginPercent: 80,
      materialMarkupPercent: 200,
      discountPercent: 0,
    };
    setComponents(prev => [...prev, newComp]);
    openEditModal(newComp.id);
  };

  // Clear all components (collection‑level)
  const clearAll = () => {
    setComponents([]);
    closeEditModal();
  };

  // Load seed data (initial collection)
  const loadSeedData = () => {
    setComponents(initialCPQComponents);
    closeEditModal();
  };

  // Update any editable field on a component
  const updateComponent = (
    id: string,
    field: keyof CPQComponent,
    value: string | number | React.ComponentType<{ className?: string }>
  ) => {
    setComponents(prev =>
      prev.map(c => (c.id === id ? { ...c, [field]: value } : c))
    );
  };

  // Toggle include/exclude: quantity=0 ↔ 1
  const toggleInclude = (id: string) => {
    setComponents(prev =>
      prev.map(c =>
        c.id === id
          ? {
              ...c,
              quantity: c.quantity > 0 ? 0 : 1,
              optional: c.quantity > 0,
            }
          : c
      )
    );
  };

  // Remove a component completely
  const removeComponent = (id: string) => {
    setComponents(prev => prev.filter(c => c.id !== id));
    closeEditModal();
  };

  // Build and open the quote receipt
  const openReceiptModal = () => {
    let text = 'CPQ Demo Receipt\n\nConfigured items:\n\n';
    components.forEach(c => {
      if (c.quantity > 0) {
        const { unitPrice, profit } = computePricing(c);
        text += `• ${c.name}: ${c.quantity} × $${unitPrice.toFixed(
          2
        )} = $${(unitPrice * c.quantity).toFixed(2)} (profit $${profit.toFixed(2)})\n`;
      }
    });
    const grand = components
      .filter(c => c.quantity > 0)
      .reduce((sum, c) => sum + computePricing(c).unitPrice * c.quantity, 0);
    text += `\nGrand Total: $${grand.toFixed(2)}\n\n— Thank you!`;
    setReceiptText(text);
    setIsQuoteOpen(true);
  };
  const closeReceiptModal = () => setIsQuoteOpen(false);

  // Compute grand total for footer
  const totalPrice = components.reduce(
    (sum, c) => sum + computePricing(c).unitPrice * c.quantity,
    0
  );

  // Currently editing component, or null
  const editingComponent =
    components.find(c => c.id === editingComponentId) || null;

  return {
    components,
    editingComponent,
    openEditModal,
    closeEditModal,
    addComponent,
    clearAll,
    loadSeedData,
    updateComponent,
    toggleInclude,
    removeComponent,
    isQuoteOpen,
    receiptText,
    openReceiptModal,
    closeReceiptModal,
    totalPrice,
  };
}
