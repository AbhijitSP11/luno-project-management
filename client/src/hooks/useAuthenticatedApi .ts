import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

export const useAuthenticatedApi = () => {
    const { getAccessTokenSilently, user, isAuthenticated } = useAuth0();
  
    const storeAuthData = async () => {
      if (!isAuthenticated) return;
  
      try {
        const token = await getAccessTokenSilently();
        localStorage.setItem('auth0_token', token);
        localStorage.setItem('auth0_user', JSON.stringify(user));
      } catch (error) {
        console.error('Error storing auth data:', error);
      }
    };
  
    useEffect(() => {
      if (isAuthenticated) {
        storeAuthData();
      }
    }, [isAuthenticated]);
  
    return {
      storeAuthData,
    };
  };