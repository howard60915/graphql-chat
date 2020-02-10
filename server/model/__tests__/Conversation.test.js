/* eslint import/first: 0 */

jest.mock("../../../knexfile", () => {
  const { POSTGRES_HOST } = process.env;
  return {
    client: "pg",
    connection: {
      host: POSTGRES_HOST || "127.0.0.1",
      user: "postgres",
      password: null,
      database: "chat_conversation"
    }
  };
});

import client from "../client";
import User from "../User";
import Conversation from "../Conversation";

describe("Conversation", () => {
  beforeAll(async () => {
    await client.reset("chat_conversation");
    await new User().insert({
      id: "00000000-0000-0000-0000-000000000001",
      email: "hello@amazing.co"
    });
    await new User().insert({
      id: "00000000-0000-0000-0000-000000000002",
      email: "world@amazing.co"
    });
  });

  describe("model", () => {
    const user = "00000000-0000-0000-0000-000000000001";
    const talker = "00000000-0000-0000-0000-000000000002";

    it("save & destroy", async () => {
      const conversation = new Conversation({ user, talker });

      await conversation.save(user);
      const id = conversation.valueOf();
      const reply = await Conversation.load(id);
      expect((await reply.talker).email).toBe("world@amazing.co");

      const delReply = await conversation.destroy(user);
      expect(delReply.deletedAt).not.toBeNull();
    });
  });
});
