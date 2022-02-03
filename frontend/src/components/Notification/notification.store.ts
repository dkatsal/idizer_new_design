/* eslint-disable @typescript-eslint/no-explicit-any */
import { types, Instance } from 'mobx-state-tree';

const { model, boolean, string } = types;
export const NotificationStore = model('NotificationStore', {
  type: string,
  isOpen: boolean,
  title: string,
  message: string,
})
  .views((self) => ({}))
  .volatile(() => ({}))
  .actions((self) => ({
    openNotification: (type: string, title: string, message: string): void => {
      self.type = type;
      self.isOpen = true;
      self.title = title;
      self.message = message;
    },
    closeNotification: (): void => {
      self.isOpen = false;
      self.type = 'success';
      self.title = '';
      self.message = '';
    },
  }));

export type INotificationStore = Instance<typeof NotificationStore>;
