import { types, Instance } from 'mobx-state-tree';
const { model, number, string, array, maybeNull } = types;

export const ImageModel = model('ImageModel', {
  name: string,
  width: number,
  height: number,
  url: string,
}).actions((self) => ({}));

export const PostCategoriesModel = model('PostCategoriesModel', {
  id: number,
  title: string,
  locale: string,
  published_at: string,
}).actions((self) => ({}));

export const PostModel = model('BlockModel', {
  id: number,
  slug: string,
  title: string,
  subTitle: maybeNull(string),
  description: maybeNull(string),
  thumbnail: maybeNull(ImageModel),
  locale: maybeNull(string),
  published_at: string,
  blog_categories: array(PostCategoriesModel),
}).actions((self) => ({}));

export type IPostModel = Instance<typeof PostModel>;
export type IPostCategoriesModel = Instance<typeof PostCategoriesModel>;
