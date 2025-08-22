import { create } from "zustand";
import { PostUserProfileBody } from "../_types/body";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type InitState = Partial<PostUserProfileBody>;

type UserProfileState = {
  form: InitState;
  setForm: (v: Partial<InitState>) => void;
  reset: () => void;
};

const initState: InitState = {
  ageGroup: undefined,
  gender: undefined,
  height: undefined,
  weight: undefined,
  sleepMinutes: undefined,
  exerciseMinutes: undefined,
  forbiddenFoods: [],
};

/**
 *@description 유저 프로필 관리 전역 store
 */
export const useUserProfileStore = create<UserProfileState>()(
  devtools(
    immer((set) => ({
      form: initState,

      setForm: (payload) =>
        set(
          (state) => {
            Object.assign(state.form, payload);
          },
          false,
          "setForm",
        ),

      reset: () => set((prev) => ({ ...prev, ...initState }), false, "reset"),
    })),
  ),
);
