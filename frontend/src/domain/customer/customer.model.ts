import { types, Instance } from 'mobx-state-tree';
const { model, string, maybeNull, boolean } = types;

export const CustomerModel = model('CustomerModel', {
  id: maybeNull(string),
  name: maybeNull(string),
  password: maybeNull(string),
  email: maybeNull(string),
  avatar: maybeNull(string),
  phone: string,
  smsCode: maybeNull(string),
  status: maybeNull(boolean),
  lang: string,
  // userId: maybeNull(string),
  createdAt: string,
  updatedAt: string,
}).actions((self) => ({}));

export type ICustomerModel = Instance<typeof CustomerModel>;
