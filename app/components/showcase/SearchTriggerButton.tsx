'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

import { useSearchUI } from './SearchUIProvider';

type SearchTriggerButtonProps = {
  className?: string;
  label?: string;
};

export default function SearchTriggerButton({
  className,
  label = 'Search',
}: SearchTriggerButtonProps) {
  const { openSearch } = useSearchUI();

  return (
    <button
      type="button"
      onClick={() => openSearch()}
      className={className}
    >
      <MagnifyingGlassIcon className="h-4 w-4" />
      {label}
    </button>
  );
}
