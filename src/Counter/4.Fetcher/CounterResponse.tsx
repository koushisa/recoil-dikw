/* eslint-disable @typescript-eslint/no-use-before-define */

import { Suspense } from "react";
import { useCounterQuery } from "../slices/counter.query.slice";
import { CounterQueryUpdateButtons } from "./CounterQueryUpdateButtons";

export const CounterResponse: React.FC = () => {
  return (
    <div style={{ paddingTop: 16 }}>
      <Suspense fallback="loading...">
        <Component />
      </Suspense>

      <CounterQueryUpdateButtons />
    </div>
  );
};

const Component: React.FC = () => {
  const { response } = useCounterQuery().getValue();

  return (
    <pre>
      ID:{response.id}
      <br />
      TITIE:{response.title}
    </pre>
  );
};
