import { FC, createContext } from 'react';
import { types, Instance } from 'mobx-state-tree';
import { useLocalObservable } from 'mobx-react-lite';
import makeInspectable from 'mobx-devtools-mst';

import { CustomerStore } from 'domain/customer';

import { MessagesStore } from 'domain/messages';

import { PreloadStore } from 'components/Preload/preload.store';
import { getToken } from 'utils/tokenUtils';
import { NotificationStore } from 'components/Notification';

const { model } = types;

export const RootStore = model('RootStore', {
  customerStore: CustomerStore,
  messagesStore: MessagesStore,
  preloadStore: PreloadStore,
  notificationStore: NotificationStore,
});

export type IRootStore = Instance<typeof RootStore>;

export const RootStoreContext = createContext<IRootStore | null>(null);

export const RootStoreProvider: FC = ({ children }) => {
  const token = getToken();
  const store = useLocalObservable(() =>
    RootStore.create({
      customerStore: {
        customer: null,
        phone: '',
        smsCode: '',
        token: token ? token : '',
        // error: '',
      },
      preloadStore: { isOpened: true },
      notificationStore: {
        type: '',
        isOpen: false,
        title: '',
        message: '',
      },
      messagesStore: {
        inbox: [],
        sentItems: [],
      },
    })
  );
  makeInspectable(store);
  return <RootStoreContext.Provider value={store}>{children}</RootStoreContext.Provider>;
};
