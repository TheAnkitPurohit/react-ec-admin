import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';

export interface AuthState {
  token: null | string;
  refresh_token: null | string;
}

export interface TokenStore extends AuthState {
  setCredentials: (token: null | string, refresh_token: null | string) => void;
  resetToken: () => void;
}

const useTokenStore = create<TokenStore>()(
  devtools(
    persist(
      (set) => ({
        token: null,
        refresh_token: null,
        setCredentials: (token: null | string, refresh_token: null | string) =>
          set(() => ({ token, refresh_token })),
        resetToken: () => set({ token: null, refresh_token: null }),
      }),
      { name: 'token-store' }
    )
  )
);

export default useTokenStore;
