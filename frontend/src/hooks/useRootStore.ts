import { useContext } from 'react';
import { RootStoreContext, IRootStore } from 'RootStore';

export const useStore = (): IRootStore => {
  const store = useContext(RootStoreContext);
  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider');
  }
  return store;
};
