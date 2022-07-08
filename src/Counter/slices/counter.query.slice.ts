import { atom } from "recoil";
import { atomCallback } from "../../lib/recoil/atomCallback";
import { atomReader } from "../../lib/recoil/atomReader";
import { fetcherSlice } from "../../lib/recoil/fetcherSlice";
import { counterState } from "./counter.slice";

const localLoadingState = atom({
  key: `counterQueryLocalLoadingState`,
  default: false
});

const [, useUpdateLoading] = atomCallback({
  toggleLoading: ({ set }) => () => {
    set(localLoadingState, (prev) => !prev);
  }
});

// データフェッチのオプション
const [queryOption, useCounterQueryOption] = atomReader({
  counterState,
  loading: localLoadingState
});

const baseUrl = "https://jsonplaceholder.typicode.com/posts";
const createEndpoint = (id: number) => {
  return `${baseUrl}/${id}`;
};

type FetchResponse = {
  id: number;
  title: string;
};

// データフェッチのスライス
const {
  reader: [, useCounterQuery],
  updater: [, useCounterQueryMutation]
} = fetcherSlice<FetchResponse>({
  url: ({ get }) => {
    const currentCounter = get(queryOption).counterState.counter;

    return createEndpoint(currentCounter);
  },
  requestInit: ({ get }) => ({
    // method: "GET"
    // headers: { Authorization: `Bearer ${get(jwtState)}` }
  }),
  disabled: ({ get }) => {
    return get(queryOption).loading;
  }
});

export { useCounterQueryOption };
export { useCounterQuery };
export const useUpdateCounterQuery = () => ({
  ...useUpdateLoading(),
  ...useCounterQueryMutation()
});
