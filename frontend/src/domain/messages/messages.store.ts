import { types, flow, Instance } from 'mobx-state-tree';
import { AxiosResponse } from 'axios';
import axios from 'server';
import { IMessagesModel, MessagesModel } from './messages.model';

const { model, array } = types;

export const MessagesStore = model('MessagesStore', {
  inbox: array(MessagesModel),
  sentItems: array(MessagesModel),
})
  .views((self) => ({
    // get messagesView(): IMessagesModel {
    //   return self.messages[0];
    // },
    getMessageById(msgId: string): IMessagesModel[] {
      const newStore = [...self.inbox, ...self.sentItems];
      return newStore.filter((item) => item.messageId === msgId);
    },
  }))
  .actions((self) => ({
    normalizeMessages({ data }: AxiosResponse): IMessagesModel[] {
      if (data.data[0]['inbox'].length > self.inbox.length) {
        self.inbox = data.data[0]['inbox'];
      }
      self.sentItems = data.data[1]['sent items'];

      // self.messages = data.data.reverseMessages[msgId];

      return self.inbox && self.sentItems;
    },
  }))
  .actions((self) => ({
    getMessages: flow(function* () {
      const result = yield axios
        .get<IMessagesModel>(`customers/message?folder[]=inbox&folder[]=sent%20items`)
        .then(self.normalizeMessages)
        .catch((error) => {
          throw new Error(error);
        });
      return result;
    }),
    // getSentMessages: flow(function* () {
    //   const result = yield axios
    //     .get<IMessagesModel>(`customers/message?folder=sent%20items`)
    //     .then(self.normalizeMessages)
    //     .catch((error) => {
    //       throw new Error(error);
    //     });
    //   return result;
    // }),
  }));

export type IMessagesStore = Instance<typeof MessagesStore>;
