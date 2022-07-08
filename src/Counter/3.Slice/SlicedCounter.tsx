/* eslint-disable @typescript-eslint/no-use-before-define */

import { CounterPresenter } from "../Counter.presenter";
import { useCounter, useUpdateCounter } from "../slices/counter.slice";

export const SlicedCounter: React.FC = () => {
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
