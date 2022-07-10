/* eslint-disable react-hooks/rules-of-hooks */

import {
  CallbackInterface as RecoilCallbackInterface,
  RecoilValueReadOnly,
  selector,
  TransactionInterface_UNSTABLE as RecoilTransactionInterface,
  UnwrapRecoilValue,
  useRecoilValue
} from "recoil";
import { nanoid } from "../nanoid";

type AnyFunc = (...args: ReadonlyArray<any>) => void;

type CallbackInput<Callback, Func = AnyFunc> = Record<
  string,
  (cb: Callback) => Func
>;

type ResultSelector<Input extends CallbackInput<any>> = RecoilValueReadOnly<
  {
    [P in keyof Input]: ReturnType<Input[P]>;
  }
>;

type CallbackReturn<Input extends CallbackInput<any>> = [
  ResultSelector<Input>,
  () => UnwrapRecoilValue<ResultSelector<Input>>
];

// Recoil Callback shorthand
export function atomCallback<
  Input extends CallbackInput<RecoilCallbackInterface>
>(input: Input, key = nanoid()): CallbackReturn<Input> {
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

// Recoil Transaction shorthand
export function atomTransaction<
  Input extends CallbackInput<RecoilTransactionInterface>
>(input: Input, key = nanoid()): CallbackReturn<Input> {
  const fields = Object.keys(input);

  const result = selector({
    key,
    get({ getCallback }) {
      return fields.map((key) => {
        const transaction = getCallback(
          (cb) => (...args: ReadonlyArray<any>) => {
            cb.transact_UNSTABLE((transactionOpts) => {
              const appliedFunc = input[key];

              appliedFunc(transactionOpts)(args);
            });
          }
        );

        return {
          [key]: transaction
        };
      });
    }
  });

  const hooks = () => useRecoilValue(result);

  // FIXME: type cast
  return ([result, hooks] as unknown) as any;
}
