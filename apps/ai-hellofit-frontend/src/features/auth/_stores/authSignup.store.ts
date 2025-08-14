import { create } from "zustand";

type InitState = {
  email: string;
  password: string;
  passwordConfirm: string;
  nickname: string;
  isPrivacyAgree: boolean;
};

type SignupFormState = {
  form: InitState;
  setForm: (v: Partial<InitState>) => void;
  reset: () => void; // 폼 전체 초기화
};

const initialState: { form: InitState } = {
  form: {
    email: "",
    password: "",
    passwordConfirm: "",
    nickname: "",
    isPrivacyAgree: false,
  },
};

export const useAuthSignupStore = create<SignupFormState>((set, get) => ({
  ...initialState,

  setForm: (payload) =>
    set((state) => ({
      form: { ...state.form, ...payload }, //
    })),

  reset: () => set({ ...initialState }),
}));
