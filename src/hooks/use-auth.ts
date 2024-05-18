import useTokenStore, { AuthState } from 'src/store/useAuthStore';

const useAuth = () => {
  const { token, refresh_token, setCredentials, resetToken } = useTokenStore((state) => state);

  const handleAddCredentails = (credentails: AuthState) => {
    setCredentials(credentails.token, credentails.refresh_token);
  };

  const handleResetAuth = () => {
    resetToken();
  };
  return { token, refresh_token, handleAddCredentails, handleResetAuth };
};

export default useAuth;
