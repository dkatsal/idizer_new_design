import { types, flow, Instance } from 'mobx-state-tree';
import axios, { AxiosResponse } from 'axios';
import { PostModel, IPostModel } from './post.model';
const { model, array } = types;

export const PostStore = model('PostStore', {
  posts: array(PostModel),
})
  .views((self) => ({
    get postView(): IPostModel {
      return self.posts[0];
    },
    getPostBySlug(slug: string): IPostModel | undefined {
      return self.posts.find((item) => item.slug === slug);
    },
  }))
  .actions((self) => ({
    normalize({ data }: AxiosResponse<IPostModel[]>): IPostModel[] {
      self.posts.replace(data);
      return self.posts;
    },
  }))
  .actions((self) => ({
    getPosts: flow(function* () {
      const result = yield axios
        .get<IPostModel[]>(`${process.env.REACT_APP_BASE_API_URL}/posts?_sort=published_at:desc`)
        .then(self.normalize);
      return result;
    }),
    getPost: flow(function* (slug: string) {
      const result = yield axios
        .get<IPostModel[]>(`${process.env.REACT_APP_BASE_API_URL}/posts?slug=${slug}`)
        .then(self.normalize);
      return result;
    }),
  }));

export type IPostStore = Instance<typeof PostStore>;
