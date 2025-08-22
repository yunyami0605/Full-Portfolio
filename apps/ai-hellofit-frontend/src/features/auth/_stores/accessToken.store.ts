import { create } from "zustand";

type InitState = {
  accessToken: string | null;
};

type AccessTokenState = {
  setToken: (payload: string) => void;
  reset: () => void;
} & InitState;

const initialState = {
  accessToken: null,
};

/**
 *@description 유저 at 관리 전역 store`
 */
export const useAccessTokenStore = create<AccessTokenState>((set) => ({
  ...initialState,

  setToken: (payload) =>
    set(() => ({
      accessToken: payload,
    })),

  reset: () => set((prev) => ({ ...prev, ...initialState })),
}));
