import { createServer, Server } from 'miragejs';

const server = (): Server => {
  return createServer({
    models: {
      //
    },
    routes() {
      this.passthrough(`${process.env.REACT_APP_BASE_API_URL}/**`);
    },
    seeds(server) {
      //
    },
  });
};

export default server;
