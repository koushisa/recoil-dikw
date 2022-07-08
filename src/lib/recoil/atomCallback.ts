/* eslint-disable react-hooks/rules-of-hooks */

import {
  CallbackInterface,
  RecoilValueReadOnly,
  selector,
  UnwrapRecoilValue,
  useRecoilValue
} from "recoil";
import { nanoid } from "../nanoid";

type AnyFunc = (...args: ReadonlyArray<any>) => void;

export type AtomCallbackInput<Func = AnyFunc> = Record<
  string,
  (cb: CallbackInterface) => Func
>;

type ResultSelector<Obj extends AtomCallbackInput> = RecoilValueReadOnly<
  {
    [P in keyof Obj]: ReturnType<Obj[P]>;
  }
>;

export type AtomCallbackReturn<Obj extends AtomCallbackInput> = [
  ResultSelector<Obj>,
  () => UnwrapRecoilValue<ResultSelector<Obj>>
];

export function atomCallback<Obj extends AtomCallbackInput>(
  input: Obj,
  key = nanoid()
): AtomCallbackReturn<Obj> {
  const fields = Object.keys(input);

  const result = selector({
    key,
    get({ getCallback }) {
      const callbacks: any = {};

      fields.forEach((key) => {
        const callback = getCallback((cb) => (...args: ReadonlyArray<any>) => {
          const func = input[key];

          func(cb)(args);
        });

        callbacks[key] = callback;
      });

      return callbacks;
    }
  });

  const hooks = () => useRecoilValue(result);

  // FIXME: type cast
  return ([result, hooks] as unknown) as any;
}
