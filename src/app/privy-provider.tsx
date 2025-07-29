'use client';

import {PrivyProvider as Provider} from '@privy-io/react-auth';
import {base} from 'viem/chains';

export function PrivyProvider({children}: {children: React.ReactNode}) {
  return (
    <Provider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ''}
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
