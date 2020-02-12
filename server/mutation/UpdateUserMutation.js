import { fromGlobalId } from "graphql-shortcake";
import { ForbiddenError } from "apollo-server-errors";
import User from "../model/User";

export default async function(source, { input }, { user }) {
  const { userId, email } = input;

  const target = await User.load(fromGlobalId(userId), new Error("not found"));

  await target.checkWritability(user, ForbiddenError);

  target.email = email;

  await target.save(user);

  return { status: "ok", user: target };
}
