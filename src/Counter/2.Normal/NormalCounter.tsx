import { CounterPresenter } from "../Counter.presenter";
import { useCounter, useUpdateCounter } from "./normalCounterState";

export const NormalCounter: React.FC = () => {
  const { counter, multiplied } = useCounter();
  const { increment, incrementAsync } = useUpdateCounter();

  return (
    <CounterPresenter
      counter={counter}
      multiplied={multiplied}
      increment={increment}
      incrementAsync={incrementAsync}
    />
  );
};
