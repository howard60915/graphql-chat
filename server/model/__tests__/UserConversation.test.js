/* eslint import/first: 0 */

jest.mock("../../../knexfile", () => {
  const { POSTGRES_HOST } = process.env;
  return {
    client: "pg",
    connection: {
      host: POSTGRES_HOST || "127.0.0.1",
      user: "postgres",
      password: null,
      database: "chat_user_conversation"
    }
  };
});

import client from "../client";
import User from "../User";
import Conversation from "../Conversation";
import UserConversation from "../UserConversation";

describe("UserConversation", () => {
  beforeAll(async () => {
    await client.reset("chat_user_conversation");
    await new User().insert({
      id: "00000000-0000-0000-0000-000000000001",
      email: "hello@amazing.co"
    });
    await new Conversation().insert({
      id: "00000000-0000-0000-0000-000000000003",
      name: "conversation"
    });
  });

  describe("model", () => {
    const user = "00000000-0000-0000-0000-000000000001";
    const conversation = "00000000-0000-0000-0000-000000000003";

    it("save & destroy", async () => {
      const userConversation = new UserConversation({
        conversation,
        user
      });

      await userConversation.save(user);
      const id = userConversation.valueOf();
      const reply = await UserConversation.load(id);
      expect((await reply.conversation).name).toBe("conversation");

      const delReply = await userConversation.destroy(user);
      expect(delReply.deletedAt).not.toBeNull();
    });
  });
});
