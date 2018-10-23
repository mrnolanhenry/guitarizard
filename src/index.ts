import AppServer from "./server";

const server = new AppServer(`${__dirname}/web/index.js`, 8080, {
  isDev: true,
  initialState: {
    count: 4
  }
});

server.start().catch(console.error);
