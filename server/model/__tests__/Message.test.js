/* eslint import/first: 0 */

jest.mock("../../../knexfile", () => {
  const { POSTGRES_HOST } = process.env;
  return {
    client: "pg",
    connection: {
      host: POSTGRES_HOST || "127.0.0.1",
      user: "postgres",
      password: null,
      database: "chat_message"
    }
  };
});

import client from "../client";
import User from "../User";
import Conversation from "../Conversation";
import Message from "../Message";

describe("Conversation", () => {
  beforeAll(async () => {
    await client.reset("chat_message");
    await new User().insert({
      id: "00000000-0000-0000-0000-000000000001",
      email: "hello@amazing.co"
    });
    await new User().insert({
      id: "00000000-0000-0000-0000-000000000002",
      email: "world@amazing.co"
    });
    await new Conversation().insert({
      id: "00000000-0000-0000-0000-000000000003",
      user_id: "00000000-0000-0000-0000-000000000001",
      talker_id: "00000000-0000-0000-0000-000000000002"
    });
  });

  describe("model", () => {
    const user = "00000000-0000-0000-0000-000000000001";
    const conversation = "00000000-0000-0000-0000-000000000003";

    it("save & destroy", async () => {
      const data = {
        user,
        conversation,
        content: "message test"
      };
      const message = new Message(data);

      await message.save(user);
      const id = message.valueOf();
      const reply = await Message.load(id);
      expect(reply.content).toBe("message test");

      const delReply = await message.destroy(user);
      expect(delReply.deletedAt).not.toBeNull();
    });
  });
});
