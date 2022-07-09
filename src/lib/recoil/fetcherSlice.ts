import {
  atom,
  DefaultValue,
  ReadOnlySelectorOptions,
  RecoilLoadable,
  selector
} from "recoil";
import { nanoid } from "../../lib/nanoid";
import { atomCallback } from "./atomCallback";
import { loadableAtomReader } from "./atomReader";

type Args = {
  url: (
    opts: Parameters<ReadOnlySelectorOptions<RequestInfo>["get"]>[0]
  ) => RequestInfo;

  requestInit?: (
    opts: Parameters<ReadOnlySelectorOptions<RequestInit>["get"]>[0]
  ) => RequestInit;

  disabled?: (
    opts: Parameters<ReadOnlySelectorOptions<boolean>["get"]>[0]
  ) => boolean;

  key?: string;
};

const fetcher = <T>(url: RequestInfo, init?: RequestInit): Promise<T> => {
  return fetch(url, init).then((res) => res.json());
};

export function fetcherSlice<T>(args: Args) {
  const { url, requestInit, disabled, key = nanoid } = args;

  const delegatedUrl = atom({
    key: `${key}/delegatedUrl`,
    default: selector({
      key: `${key}/delegatedUrl/default`,
      get: (opts) => url(opts)
    })
  });

  const delegatedRequestInit = selector({
    key: `${key}/delegatedRequestInit`,
    get: (opts) => requestInit?.(opts)
  });

  const delegatedDisabled = selector({
    key: `${key}/delegatedDisabled`,
    get: (opts) => {
      if (disabled === undefined) {
        return false;
      }

      return disabled(opts);
    }
  });

  const refreshId = atom({
    key: `${key}/refreshId`,
    default: 0
  });

  const loading = atom({
    key: `${key}/loading`,
    default: false
  });

  const response = selector<T>({
    key: `${key}/response`,
    get: ({ get }) => {
      // for refresh query
      get(refreshId);

      if (get(loading) || get(delegatedDisabled)) {
        return RecoilLoadable.loading();
      }

      const url = get(delegatedUrl);
      const init = get(delegatedRequestInit);

      return fetcher(url, init);
    },
    set: ({ set }, value) => {
      if (value instanceof DefaultValue) {
        set(refreshId, (v) => v + 1);
      }
    }
  });

  return {
    reader: loadableAtomReader({
      loading,
      response
    }),

    updater: atomCallback({
      prefetch: ({ snapshot }) => () => {
        snapshot.getLoadable(response);
      },

      refetch: ({ reset }) => () => {
        reset(response);
      },

      toggleLoading: ({ set }) => () => {
        set(loading, (prev) => !prev);
      }
    })
  };
}
