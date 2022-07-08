type Props = {
  counter: number;
  multiplied: number;
  increment: () => void;
  incrementAsync: () => void;
};

export const CounterPresenter: React.FC<Props> = ({
  counter,
  multiplied,
  increment,
  incrementAsync
}) => {
  return (
    <>
      <p>{counter}</p>
      <p>multiplied: {multiplied}</p>

      <button onClick={increment}>+</button>
      <button onClick={incrementAsync}>incrementAsync</button>
    </>
  );
};
