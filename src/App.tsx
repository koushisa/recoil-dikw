import "./styles.css";
import { Suspense } from "react";
import { RecoilRoot } from "recoil";
import { Main } from "./Main";

export default function App(): JSX.Element {
  return (
    <RecoilRoot>
      <Suspense fallback={null}>
        <Main />
      </Suspense>
    </RecoilRoot>
  );
}
