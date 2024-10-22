'use client';

import { useAuth0 } from '@auth0/auth0-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuthenticatedApi } from '@/hooks/useAuthenticatedApi ';

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
  const { storeAuthData } = useAuthenticatedApi();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      loginWithRedirect();
    }
    if (isAuthenticated && !isLoading) {
      storeAuthData(); 
    }
  }, [isAuthenticated, isLoading, loginWithRedirect, storeAuthData]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <>{children}</> : null;
}
