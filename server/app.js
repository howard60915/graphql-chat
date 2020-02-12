import graphqlServer from "./graphql";

const PORT = process.env.NODE_PORT || process.env.PORT || 8080;

const options = {
  port: PORT,
  endpoint: "/graphql",
  playground: "/playground"
};

graphqlServer.start(options, ({ port }) => {
  // eslint-disable-next-line no-console
  console.log(`> Ready on http://localhost:${port}`);
});
