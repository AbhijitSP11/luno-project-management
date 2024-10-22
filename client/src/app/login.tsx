import { useAuth0 } from '@auth0/auth0-react';

export function LoginButton() {
  const { loginWithRedirect } = useAuth0();

  return (
    <button
      onClick={() => loginWithRedirect({
        authorizationParams: {
          connection: 'google-oauth2', 
        }
      })}
      className="btn btn-primary"
    >
      Log In with Google
    </button>
  );
}