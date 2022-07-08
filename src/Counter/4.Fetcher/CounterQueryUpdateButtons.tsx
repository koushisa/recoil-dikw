import {
  useCounterQueryOption,
  useUpdateCounterQuery
} from "../slices/counter.query.slice";

export const CounterQueryUpdateButtons: React.FC = () => {
  const { loading } = useCounterQueryOption();
  const { toggleLoading, refetch } = useUpdateCounterQuery();

  return (
    <div style={{ paddingTop: 16 }}>
      <label>
        toggle query loading
        <input type="checkbox" checked={loading} onChange={toggleLoading} />
      </label>

      <br />

      <button onClick={refetch}>refetch</button>
      <br />
    </div>
  );
};
