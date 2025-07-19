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
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black/50" aria-hidden="true" />

        <div className="relative bg-gray-900 rounded-lg max-w-lg w-full p-6 mx-auto text-white">
          <Dialog.Title className="text-xl font-bold mb-4">CPQ Demo Receipt</Dialog.Title>

          <div className="whitespace-pre-wrap text-sm max-h-80 overflow-y-auto">
            {receiptText}
          </div>

          <button
            onClick={onClose}
            className="mt-6 bg-[#05c8fb] hover:bg-[#0bbfff] text-gray-900 font-semibold rounded-md px-4 py-2 transition focus:outline-none"
          >
            Close
          </button>
        </div>
      </div>
    </Dialog>
  );
}
