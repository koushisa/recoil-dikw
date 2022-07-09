import { CounterPresenter } from "../Counter.presenter";
import { useCounter, useUpdateCounter } from "./normalCounterState";

// コンポーネントはプロダクトの知恵(=ユーザー体験)を表現する
export const NormalCounter: React.FC = () => {
  const { counter, multiplied } = useCounter();
  const { increment, incrementAsync } = useUpdateCounter();

  return (
    <CounterPresenter
      counter={counter}
      multiplied={multiplied}
      onClickPlus={increment}
      onClickPlusAsync={incrementAsync}
    />
  );
};
