import useProfileStore, { ProfileState } from 'src/store/useProfileStore';

const useProfile = () => {
  const profile = useProfileStore((state) => state);

  const handleSetProfile = (profileData: ProfileState) => {
    profile.setProfile(profileData);
  };

  return { profile, handleSetProfile };
};

export default useProfile;
