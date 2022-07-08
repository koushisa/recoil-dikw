import {
  useCounterQuery,
  useCounterQueryMutation
} from "../slices/counter.query.slice";

export const CounterQueryUpdateButtons: React.FC = () => {
  // loadingのみを参照する
  const loading = useCounterQuery()
    .map((v) => v.loading)
    .valueMaybe();

  const { toggleLoading, refetch } = useCounterQueryMutation();

  return (
    <div style={{ paddingTop: 16 }}>
      <label>
        toggle query loading
        <input
          type="checkbox"
          checked={loading || undefined}
          onChange={toggleLoading}
        />
      </label>

      <br />

      <button onClick={refetch}>refetch</button>
      <br />
    </div>
  );
};
