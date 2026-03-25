// File: app/cpq-demo/components/QuoteModal.tsx

import React from 'react';
import { Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

type Props = {
  isOpen: boolean;
  receiptText: string;
  onClose: () => void;
};

export default function QuoteModal({ isOpen, receiptText, onClose }: Props) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50">
      <div className="fixed inset-0 bg-black/50" />
      <div className="flex min-h-screen items-center justify-center p-4">
        <Dialog.Panel className="app-dialog-scroll w-full max-w-lg rounded-[1.5rem] border border-gray-700 bg-gray-900 text-white">
          <div className="app-dialog-header">
            <Dialog.Title className="text-xl font-bold">Quote Receipt</Dialog.Title>
            <button
              type="button"
              onClick={onClose}
              className="app-touch-target inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-slate-300 transition hover:border-white/20 hover:text-white"
              aria-label="Close quote receipt"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
          <div className="app-dialog-body">
            <div className="whitespace-pre-wrap text-sm max-h-80 overflow-y-auto pr-1">{receiptText}</div>
            <button
              onClick={onClose}
              className="mt-4 inline-flex min-h-11 items-center justify-center rounded-full bg-[#05c8fb] px-4 py-2 font-semibold text-black transition hover:bg-[#04b3e0]"
            >
              Close
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
