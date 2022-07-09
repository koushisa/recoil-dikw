import { useRecoilCallback, useRecoilValue } from "recoil";
import { CounterPresenter } from "../Counter.presenter";
import { counterState, multipliedCounterState } from "./badCounterState";

export const BadCounter: React.FC = () => {
  const counter = useRecoilValue(counterState);
  const multiplied = useRecoilValue(multipliedCounterState);

  // ロジックが露出している
  const increment = useRecoilCallback(
    ({ set }) => () => {
      set(counterState, (prev) => prev + 1);

      // 利用者が自由に状態を変更出来てしまう
      // set(counterState, Number.MAX_SAFE_INTEGER);
    },
    []
  );
  const incrementAsync = useRecoilCallback(
    ({ set }) => () => {
      setTimeout(() => {
        set(counterState, (prev) => prev + 1);
      }, 1000);
    },
    []
  );

  return (
    <CounterPresenter
      counter={counter}
      multiplied={multiplied}
      onClickPlus={increment}
      onClickPlusAsync={incrementAsync}
    />
  );
};
