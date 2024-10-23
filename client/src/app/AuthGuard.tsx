'use client';

import { useAuth } from "@/hooks/useAuth";

export function AuthGuard({ 
  children,
  fallback = <div>Loading...</div>
}: { 
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  const { isLoading, isAuthenticated } = useAuth(true);

  if (isLoading) {
    return fallback;
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}