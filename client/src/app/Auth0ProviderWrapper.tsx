'use client';

import { Auth0Provider } from '@auth0/auth0-react';
import { useRouter } from 'next/navigation';

export function Auth0ProviderWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const domain = process.env.NEXT_PUBLIC_AUTH0_DOMAIN ?? 'invalid domain';
  const clientId = process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID ?? 'invalid client';

  const onRedirectCallback = (appState: any) => {
    router.push(appState?.returnTo || '/');
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE,
        redirect_uri: typeof window !== 'undefined' ? window.location.origin : '',
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
}