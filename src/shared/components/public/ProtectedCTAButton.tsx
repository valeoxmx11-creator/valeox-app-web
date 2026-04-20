'use client';

import { useState } from 'react';

type ProtectedAction = 'diagnosis' | 'gated_download' | 'save_project' | 'premium_access';

export function ProtectedCTAButton({
  ctaKey,
  action,
  label,
  className,
}: {
  ctaKey: string;
  action: ProtectedAction;
  label: string;
  className?: string;
}) {
  const [loading, setLoading] = useState(false);

  const startFlow = async () => {
    setLoading(true);

    const response = await fetch('/api/protected-cta/start', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ctaKey,
        action,
        source_page: window.location.pathname,
        source_type: 'direct',
        landing_url: window.location.href,
      }),
    });

    const result = await response.json();

    if (response.ok && result.authEntryUrl) {
      window.location.href = result.authEntryUrl;
      return;
    }

    setLoading(false);
  };

  return (
    <button className={className} onClick={startFlow} disabled={loading}>
      {loading ? 'Iniciando…' : label}
    </button>
  );
}
