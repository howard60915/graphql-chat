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
import Conversation from "../Conversation";

describe("Conversation", () => {
  beforeAll(() => client.reset("chat_conversation"));

  describe("model", () => {
    const user = "00000000-0000-0000-0000-000000000001";

    it("save & destroy", async () => {
      const conversation = new Conversation({ name: "conversation" });

      await conversation.save(user);
      const id = conversation.valueOf();
      const reply = await Conversation.load(id);
      expect(reply.name).toBe("conversation");

      const delReply = await conversation.destroy(user);
      expect(delReply.deletedAt).not.toBeNull();
    });
  });
});
