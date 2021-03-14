/// <reference types="react" />
declare const useAuth: () => {
    userMetadata: null;
    setUserMetadata: import("react").Dispatch<import("react").SetStateAction<null>>;
    isAuthenticated: boolean;
    user: any;
    isLoading: boolean;
    isAdmin: boolean;
    logout: (options?: import("@auth0/auth0-react").LogoutOptions | undefined) => void;
    loginWithRedirect: (options?: import("@auth0/auth0-react").RedirectLoginOptions | undefined) => Promise<void>;
    getAccessTokenSilently: (options?: import("@auth0/auth0-react").GetTokenSilentlyOptions | undefined) => Promise<string>;
};
export default useAuth;
