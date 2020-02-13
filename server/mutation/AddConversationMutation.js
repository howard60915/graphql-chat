import { fromGlobalId } from "graphql-shortcake";
import { AuthenticationError } from "apollo-server-errors";
import UserConversation from "../model/UserConversation";
import User from "../model/User";

export default async function(source, { input }, { user }) {
  if (!user) throw new AuthenticationError("authorization required");
  const { userId } = input;
  const talkWith = await User.load(
    fromGlobalId(userId),
    new Error("not found")
  );
  const conversation = user.haveConversationWith(talkWith);

  await new UserConversation({ user, conversation }).save(user);
  await new UserConversation({ user: talkWith, conversation }).save(user);

  return { status: "ok", conversation };
}
