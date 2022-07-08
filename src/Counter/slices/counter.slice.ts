/* eslint-disable @typescript-eslint/no-use-before-define */

import { atom, selector } from "recoil";
import { nanoid } from "../../lib/nanoid";
import { atomCallback } from "../../lib/recoil/atomCallback";
import { atomReader } from "../../lib/recoil/atomReader";

export const {
  reader: [counterState, useCounter],
  updater: [counterUpdater, useUpdateCounter]
} = counterSlice();

// カウンターの知識を抽象化したスライス
function counterSlice(key = nanoid()) {
  const counter = atom({
    key: `${key}/counter`,
    default: 0
  });

  const multiplied = selector({
    key: `${key}/multiplied`,
    get({ get }) {
      return get(counter) * 2;
    }
  });

  return {
    reader: atomReader({
      counter,
      multiplied
    }),

    updater: atomCallback({
      increment: ({ set }) => () => {
        set(counter, (prev) => prev + 1);
      },

      incrementAsync: ({ set }) => () => {
        setTimeout(() => {
          set(counter, (prev) => prev + 1);
        }, 1000);
      }
    })
  };
}
