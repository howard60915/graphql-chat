import client from "../../model/client";
import User from "../../model/User";
import server, { mutation } from "../../__tests__";

const { addConversation } = mutation;

describe("AddConversationMutation", () => {
  const userId = new User("00000000-0000-0000-0000-000000000015").id;
  const input = { userId };

  afterAll(() => new Promise(() => server.close()));

  it("successfully add conversation", async () => {
    client.mockReturnValueOnce([
      {
        id: "00000000-0000-0000-0000-000000000015",
        email: "world@chat.com"
      }
    ]);
    client.mockReturnValueOnce([
      {
        id: "00000000-0000-0000-0000-000000000020",
        name: "hello@chat.com, world@chat.com"
      }
    ]);
    client.mockReturnValueOnce([
      {
        id: "00000000-0000-0000-0000-000000000020",
        conversation_id: "00000000-0000-0000-0000-000000000020",
        user_id: "00000000-0000-0000-0000-000000000010"
      }
    ]);
    client.mockReturnValueOnce([
      {
        id: "00000000-0000-0000-0000-000000000020",
        conversation_id: "00000000-0000-0000-0000-000000000020",
        user_id: "00000000-0000-0000-0000-000000000015"
      }
    ]);
    const { errors, data } = await addConversation.user({ input });
    expect(errors).toBeUndefined();
    expect(client).toMatchSnapshot();
    expect(client).toHaveBeenCalledTimes(4);
    expect(data).toEqual({
      addConversation: {
        status: "ok",
        conversation: {
          name: "hello@chat.com, world@chat.com"
        }
      }
    });
  });

  it("when talker not found", async () => {
    client.mockReturnValueOnce([]);
    const { errors } = await addConversation.user({ input });
    expect(errors[0].message).toBe("not found");
  });
});
