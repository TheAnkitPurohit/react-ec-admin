import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface ProfileState {
  avatar: null | string;
  email: string;
  isMainAdmin: boolean;
  name: string;
}

export interface ProfileStore extends ProfileState {
  setProfile: (data: ProfileState) => void;
}

const useProfileStore = create<ProfileStore>()(
  devtools((set) => ({
    avatar: null,
    email: '',
    isMainAdmin: false,
    name: '',
    setProfile: (data: ProfileState) => set(() => ({ ...data })),
  }))
);

export default useProfileStore;
