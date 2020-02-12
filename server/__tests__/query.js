export default function(req) {
  return {
    queryUsers: req(`
      query {
        users { id email }
      }
    `)
  };
}
