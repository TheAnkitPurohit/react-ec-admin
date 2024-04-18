import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import {
  AuthState,
  resetState,
  setCredentials,
  selectCurrentToken,
  selectCurrentRefreshToken,
} from 'src/store/slices/authSlice';

const useAuth = () => {
  const token = useAppSelector(selectCurrentToken);
  const refreshToken = useAppSelector(selectCurrentRefreshToken);

  const dispatch = useAppDispatch();

  const handleAddCredentails = (credentails: AuthState) => {
    localStorage.setItem('auth', JSON.stringify(credentails));
    dispatch(setCredentials(credentails));
  };

  const handleResetAuth = () => {
    dispatch(resetState());
    localStorage.removeItem('auth');
  };
  return { token, refreshToken, handleAddCredentails, handleResetAuth };
};

export default useAuth;
