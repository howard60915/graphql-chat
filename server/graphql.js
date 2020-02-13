import { GraphQLServer, PubSub } from "graphql-yoga";
import auth from "./auth";
import typeDefs from "./schema";
import resolvers from "./resolvers";

const jwtParser = auth.contextParser();
const pubsub = new PubSub();

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context: async context => {
    const { request, response } = context;
    const parsedContenx = await jwtParser({ req: request, res: response });
    return { ...parsedContenx, pubsub };
  }
});

auth.applyMiddleware(server.express);

export default server;
