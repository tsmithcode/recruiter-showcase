'use client';

import { track } from '@vercel/analytics';

export function recordRecruiterEvent(eventName: string, payload?: Record<string, string>) {
  try {
    track(eventName, payload);
  } catch {
    // Ignore analytics failures so recruiter-facing interactions never break.
  }
}
