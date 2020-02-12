import { GraphQLServer } from "graphql-yoga";
import auth from "./auth";

const server = new GraphQLServer({
  typeDefs: `
    type Query {
      hello: String
    }
  `,
  resolvers: {
    Query: {
      hello: () => "hello"
    }
  }
});

auth.applyMiddleware(server.express);

export default server;
