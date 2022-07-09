type CounterPresenterProps = {
  counter: number;
  multiplied: number;
  onClickPlus: () => void;
  onClickPlusAsync: () => void;
};

export const CounterPresenter: React.FC<CounterPresenterProps> = ({
  counter,
  multiplied,
  onClickPlus,
  onClickPlusAsync
}) => {
  return (
    <>
      <p>{counter}</p>
      <p>multiplied: {multiplied}</p>

      <button onClick={onClickPlus}>+</button>
      <button onClick={onClickPlusAsync}>+ Async</button>
    </>
  );
};
