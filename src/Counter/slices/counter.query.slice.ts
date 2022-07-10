import { fetcherSlice } from "../../lib/recoil/fetcherSlice";
import { counterState } from "./counter.slice";

const baseUrl = "https://jsonplaceholder.typicode.com/posts";
const createEndpoint = (id: number) => {
  return `${baseUrl}/${id}`;
};

type FetchResponse = {
  id: number;
  title: string;
};

// データフェッチのスライス
export const {
  reader: [counterQueryReader, useCounterQuery],
  updater: [counterQueryMutation, useCounterQueryMutation]
} = fetcherSlice<FetchResponse>({
  url: ({ get }) => {
    const currentCounter = get(counterState).counter;

    return createEndpoint(currentCounter);
  },
  requestInit: ({ get }) => ({
    // method: "GET"
    // headers: { Authorization: `Bearer ${get(jwtState)}` }
  })

  // disabled: ({ get }) => {
  // 3の倍数だけloading状態にする
  // return get(counterState).counter % 3 === 0;
  // }
});
