// File: app/cpq-demo/components/QuoteModal.tsx

import React from 'react';
import { Dialog } from '@headlessui/react';

type Props = {
  isOpen: boolean;
  receiptText: string;
  onClose: () => void;
};

export default function QuoteModal({ isOpen, receiptText, onClose }: Props) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/50" />
      <div className="flex min-h-screen items-center justify-center p-4">
        <Dialog.Panel className="bg-gray-900 p-6 rounded-lg text-white w-full max-w-lg">
          <Dialog.Title className="text-xl font-bold mb-4">Quote Receipt</Dialog.Title>
          <div className="whitespace-pre-wrap text-sm max-h-80 overflow-y-auto">{receiptText}</div>
          <button
            onClick={onClose}
            className="mt-4 bg-[#05c8fb] px-4 py-2 rounded hover:bg-[#04b3e0] text-black"
          >
            Close
          </button>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
