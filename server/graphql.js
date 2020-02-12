import { GraphQLServer } from "graphql-yoga";
import auth from "./auth";
import typeDefs from "./schema";
import resolvers from "./resolvers";

const jwtParser = auth.contextParser();
const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context: async context => {
    const { request, response } = context;
    return jwtParser({ req: request, res: response });
  }
});

auth.applyMiddleware(server.express);

export default server;
