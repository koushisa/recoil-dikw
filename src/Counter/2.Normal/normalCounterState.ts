import { atom, selector, useRecoilCallback, useRecoilValue } from "recoil";

// atomは非公開
const counter = atom({
  key: "normalCounterState",
  default: 0
});

const multiplied = selector({
  key: "normalMultipliedCounterState",
  get({ get }) {
    return get(counter) * 2;
  }
});

// カスタムフックのみを公開する
export const useCounter = () => {
  return {
    counter: useRecoilValue(counter),
    multiplied: useRecoilValue(multiplied)
  };
};

export const useUpdateCounter = () => {
  return {
    increment: useRecoilCallback(
      ({ set }) => () => {
        set(counter, (prev) => prev + 1);
      },
      []
    ),

    incrementAsync: useRecoilCallback(
      ({ set }) => () => {
        setTimeout(() => {
          set(counter, (prev) => prev + 1);
        }, 1000);
      },
      []
    )
  };
};
