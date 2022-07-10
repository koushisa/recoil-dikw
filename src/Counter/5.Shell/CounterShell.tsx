/* eslint-disable @typescript-eslint/no-use-before-define */

import { Suspense } from "react";
import { selector, useRecoilValueLoadable } from "recoil";
import {
  counterQueryMutation,
  counterQueryReader
} from "../slices/counter.query.slice";

type Shell = {
  loading: boolean;
  response: {
    id: number;
    title: string;
  };
  prefetch: () => void;
  refetch: () => void;
  toggleLoading: () => void;
  dto: {
    id: number;
    title: string;
  };
};

// このコンポーネントの依存ステートを集約する
const shell = selector<Shell>({
  key: "counterShell",
  get: ({ get }) => {
    const query = get(counterQueryReader);
    const mutation = get(counterQueryMutation);

    const dto = {
      id: query.response.id,
      title: `dto_${query.response.title}`
    };

    return { ...query, ...mutation, dto };
  },
  set: ({ get, set, reset }, newValue) => {
    // something
  }
});

export const CounterShell: React.FC = () => {
  return (
    <div style={{ paddingTop: 16 }}>
      <Suspense fallback="loading...">
        <CounterQueryUpdateButtons />
        <Component />
      </Suspense>
    </div>
  );
};

const CounterQueryUpdateButtons: React.FC = () => {
  const { loading, toggleLoading, refetch } = useRecoilValueLoadable(
    shell
  ).getValue();

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

const Component: React.FC = () => {
  const { dto } = useRecoilValueLoadable(shell).getValue();

  return (
    <pre>
      ID:{dto.id}
      <br />
      TITIE:{dto.title}
    </pre>
  );
};
