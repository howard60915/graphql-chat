export default {
  subscribe: (source, args, { pubsub }) => pubsub.asyncIterator("OnMessage")
};
