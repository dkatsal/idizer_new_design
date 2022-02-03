import { types, flow, Instance } from 'mobx-state-tree';
import { AxiosResponse } from 'axios';
import axios from 'server';
import { CustomerModel, ICustomerModel } from './customer.model';
import { saveToken, removeToken } from 'utils/tokenUtils';

const { model, string, maybeNull, maybe } = types;

export const CustomerStore = model('CustomerStore', {
  customer: maybeNull(CustomerModel),
  phone: string,
  smsCode: maybe(string),
  token: string,
  // error: string,
})
  .views((self) => ({}))
  .actions((self) => ({
    normalizeSmsCode({ data }: AxiosResponse) {
      self.smsCode = String(data.data.smsCode);
      self.phone = String(data.data.phone);
      return self;
    },
    normalizeStore({ data }: AxiosResponse) {
      self.customer = data.data.customer;
      self.token = data.data.token;
      saveToken(self.token);
      return self;
    },
    normalizeCustomerProfile({ data }: AxiosResponse): ICustomerModel | null {
      self.customer = data.data.customer;
      return self.customer;
    },
    clearStore() {
      self.customer = null;
      self.token = '';
      removeToken();
      return self;
    },
  }))
  .actions((self) => ({
    getSmsCode: flow(function* (phone) {
      const result = yield axios
        .post(`customers/code`, phone)
        .then(self.normalizeSmsCode)
        .catch((error) => {
          throw new Error(error);
        });
      return result;
    }),
    sendMessage: flow(function* (sendData) {
      const result = yield axios
        .post(`customers/message`, sendData)
        // .then(self.normalizeSmsCode)
        .catch((error) => {
          throw new Error(error);
        });
      return result;
    }),
    login: flow(function* (phone, data) {
      const result = yield axios
        .put(`customers/code`, { phone, ...data })
        .then(self.normalizeStore)
        .catch((error) => {
          throw new Error(error);
        });
      return result;
    }),
    getProfile: flow(function* () {
      const result = yield axios
        .get<ICustomerModel>(`customers/profile`)
        .then(self.normalizeCustomerProfile)
        .catch((error) => {
          throw new Error(error);
        });
      return result;
    }),
    updateProfile: flow(function* (dataProfile) {
      const result = yield axios.put<ICustomerModel[]>(`customers/profile`, dataProfile);
      return result;
    }),
  }));

export type ICustomerStore = Instance<typeof CustomerStore>;
