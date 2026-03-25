'use client';

import Link, { LinkProps } from 'next/link';
import { MouseEventHandler, PropsWithChildren } from 'react';

import { recordRecruiterEvent } from '@/lib/telemetry';

type RecruiterLinkProps = PropsWithChildren<
  LinkProps & {
    className?: string;
    eventName?: string;
    eventPayload?: Record<string, string>;
    target?: string;
    rel?: string;
  }
>;

export default function RecruiterLink({
  children,
  className,
  eventName,
  eventPayload,
  onClick,
  ...props
}: RecruiterLinkProps & {
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}) {
  return (
    <Link
      {...props}
      className={className}
      onClick={(event) => {
        if (eventName) {
          recordRecruiterEvent(eventName, eventPayload);
        }

        onClick?.(event);
      }}
    >
      {children}
    </Link>
  );
}
