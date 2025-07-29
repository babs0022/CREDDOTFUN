'use client';

import {PrivyProvider as Provider} from '@privy-io/react-auth';
import {base} from 'viem/chains';
import {useEffect, useState} from 'react';

export function PrivyProvider({children}: {children: React.ReactNode}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  
  return (
    <Provider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || 'clvcrz3jy03t0yean3swd24g4'}
      config={{
        loginMethods: ['x', 'email', 'wallet'],
        appearance: {
          theme: 'light',
          accentColor: '#676FFF',
          logo: 'https://your-logo-url',
        },
        defaultChain: base,
        supportedChains: [base],
      }}
    >
      {children}
    </Provider>
  );
}
