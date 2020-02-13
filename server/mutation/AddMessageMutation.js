import { fromGlobalId } from "graphql-shortcake";
import { AuthenticationError } from "apollo-server-errors";
import UserConversation from "../model/UserConversation";
import Message from "../model/Message";

export default async function(source, { input }, { user }) {
  if (!user) throw new AuthenticationError("authorization required");
  const { conversationId, content } = input;
  const { fetcher } = UserConversation;
  const userConversation = await fetcher
    .where("user", user)
    .where("conversation", fromGlobalId(conversationId))
    .fetch(new Error("not found"));

  const conversation = await userConversation.conversation;

  const message = new Message({ user, content, conversation });
  await message.save(user);

  return { status: "ok", message };
}
