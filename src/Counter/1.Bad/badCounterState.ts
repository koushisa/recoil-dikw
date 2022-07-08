import { atom, selector } from "recoil";

// BAD: atomを公開している
// 他のコンポーネントから自由に変更可能であり、危険
export const counterState = atom({
  key: "badCounterState",
  default: 0
});

export const multipliedCounterState = selector({
  key: "badMultipliedCounterState",
  get({ get }) {
    return get(counterState) * 2;
  }
});
