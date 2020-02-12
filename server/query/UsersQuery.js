import User from "../model/User";

export default function() {
  const { fetcher } = User;

  return fetcher.fetchAll();
}
