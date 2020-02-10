/* eslint import/first: 0 */

jest.mock("../../../knexfile", () => {
  const { POSTGRES_HOST } = process.env;
  return {
    client: "pg",
    connection: {
      host: POSTGRES_HOST || "127.0.0.1",
      user: "postgres",
      password: null,
      database: "chat_user"
    }
  };
});

import faker from "faker";
import client from "../client";
import User from "../User";

describe("User", () => {
  beforeAll(() => client.reset("chat_user"));

  const email = faker.internet.email();
  const operator = "00000000-0000-0000-0000-000000000000";

  describe("model", () => {
    it("save & destroy", async () => {
      const user = new User({
        email,
        isAdmin: true,
        password: faker.internet.password()
      });

      await user.save(operator);

      const id = user.valueOf();
      const reply = await User.load(id);
      expect(reply.email).toBe(email);

      const delReply = await user.destroy(operator);
      expect(delReply.deletedAt).not.toBeNull();
    });
  });
});
