import { useGetAuthUserQuery } from "@/state/api";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export function useAuth(requireAuth = true) {
  const { data: session, status } = useSession();
  
  const router = useRouter();
  const pathname = usePathname();
  const {
    data: authUser,
    error,
    isLoading: isLoadingUser,
  } = useGetAuthUserQuery(undefined, {
    skip: !session?.user?.id,
  });

  useEffect(() => {
    if (requireAuth && status === "unauthenticated" && pathname !== "/" && pathname !== "/api/auth/signin") {
      router.push('/api/auth/signin');
    }
  }, [requireAuth, status, router, pathname]);

  return {
    session,
    status,
    isLoading: status === "loading" || isLoadingUser,
    isAuthenticated: status === "authenticated",
    user: authUser?.user,
    userDetails: authUser?.userDetails,
    error,
  };
}