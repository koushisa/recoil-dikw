import { BadCounter } from "./1.Bad/BadCounter";
import { NormalCounter } from "./2.Normal/NormalCounter";
import { SlicedCounter } from "./3.Slice/SlicedCounter";
import { CounterResponse } from "./4.Fetcher/CounterResponse";
import { CounterShell } from "./5.Shell/CounterShell";

export const Counter: React.FC = () => {
  return (
    <>
      <p>BadCounter</p>
      <BadCounter />

      <hr />

      <p>NormalCounter</p>
      <NormalCounter />

      <hr />

      <p>SlicedCounter</p>
      <SlicedCounter />
      <CounterResponse />

      {/* <p>CounterShell</p>
      <CounterShell /> */}

      <hr />
    </>
  );
};
