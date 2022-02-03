import { types } from 'mobx-state-tree';
const { model, boolean } = types;

export const PreloadStore = model('PreloadStore', {
  isOpened: boolean,
})
  .actions((self) => ({
    setOpen() {
      self.isOpened = true;
    },
  }))
  .actions((self) => ({
    setClose() {
      self.isOpened = false;
    },
  }));
