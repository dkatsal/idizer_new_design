import { types, Instance } from 'mobx-state-tree';
const { model, maybe, string, number, maybeNull, array } = types;

export const FromModel = model('FromModel', {
  address: string,
  name: string,
  // avatar: maybe(string),
}).actions((self) => ({}));

export const ToModel = model('ToModel', {
  address: string,
  name: string,
  // avatar: maybe(string),
}).actions((self) => ({}));

export const FromValueModel = model('FromValueModel', {
  value: array(FromModel),
  // html: string,
  // text: string,
}).actions((self) => ({}));

export const ToValueModel = model('ToValueModel', {
  value: array(ToModel),
  // html: string,
  // text: string,
}).actions((self) => ({}));

export const ContentModel = model('ContentModel', {
  data: array(number),
  type: string,
}).actions((self) => ({}));

export const AttachmentModel = model('AttachmentModel', {
  checksum: string,
  content: maybe(ContentModel),
  contentDisposition: string,
  contentType: string,
  // headers: {}, //{}
  partId: string,
  // release: maybeNull(number), //null
  size: maybeNull(number),
  type: string,
}).actions((self) => ({}));

export const MessagesModel = model('MessagesModel', {
  attachments: maybe(array(AttachmentModel)),
  from: maybe(FromValueModel),
  to: maybe(ToValueModel),
  subject: maybeNull(string),
  text: maybeNull(string),
  // read: boolean,
  messageId: maybe(string),
  date: string,
}).actions((self) => ({}));

export type IFromModel = Instance<typeof FromModel>;
export type IToModel = Instance<typeof ToModel>;
export type IFromValueModel = Instance<typeof FromValueModel>;
export type IToValueModel = Instance<typeof ToValueModel>;
export type IMessagesModel = Instance<typeof MessagesModel>;
