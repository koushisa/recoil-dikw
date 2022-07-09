/* eslint-disable react-hooks/rules-of-hooks */

import {
  RecoilValue,
  RecoilValueReadOnly,
  selector,
  UnwrapRecoilValue,
  useRecoilValue,
  useRecoilValueLoadable
} from "recoil";
import { nanoid } from "../nanoid";

type Input = Record<string, RecoilValue<unknown>>;

type ResultSelector<Obj extends Input> = RecoilValueReadOnly<
  {
    [P in keyof Obj]: UnwrapRecoilValue<Obj[P]>;
  }
>;

type AtomReaderReturn<Obj extends Input> = [
  ResultSelector<Obj>,
  () => UnwrapRecoilValue<ResultSelector<Obj>>
];

export function atomReader<Obj extends Input>(
  input: Obj,
  key = nanoid()
): AtomReaderReturn<Obj> {
  const fields = Object.keys(input);

  const result = selector({
    key,
    get({ get }) {
      const results: any = {};

      fields.forEach((key) => {
        results[key] = get(input[key]);
      });

      return results;
    }
  });

  const hooks = () => useRecoilValue(result);

  // FIXME: type cast
  return ([result, hooks] as unknown) as any;
}

export function loadableAtomReader<Obj extends Input>(
  input: Obj,
  key = nanoid()
) {
  const [result] = atomReader(input, key);

  // with Loadable
  const hooks = () => useRecoilValueLoadable(result);

  return [result, hooks] as const;
}
