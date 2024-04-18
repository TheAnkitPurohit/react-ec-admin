import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { setProfile, ProfileState, selectCurrentProfile } from 'src/store/slices/profileSlice';

const useProfile = () => {
  const profile = useAppSelector(selectCurrentProfile);

  const dispatch = useAppDispatch();

  const handleSetProfile = (profileData: ProfileState) => {
    dispatch(setProfile(profileData));
  };

  return { profile, handleSetProfile };
};

export default useProfile;
