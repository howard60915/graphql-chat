import client from "../../model/client";
import User from "../../model/User";
import Conversation from "../../model/Conversation";
import server, { mutation } from "../../__tests__";

const { addMessage } = mutation;

describe("AddMessageMutation", () => {
  const conversationId = new Conversation(
    "00000000-0000-0000-0000-000000000015"
  ).id;
  const content = "hello world";
  const input = { conversationId, content };

  afterAll(() => new Promise(() => server.close()));

  it("successfully add message", async () => {
    client.mockReturnValueOnce([
      {
        id: "00000000-0000-0000-0000-000000000015",
        user_id: "00000000-0000-0000-0000-000000000010",
        conversation_id: "00000000-0000-0000-0000-000000000015"
      }
    ]);
    client.mockReturnValueOnce([
      {
        id: "00000000-0000-0000-0000-000000000015"
      }
    ]);
    client.mockReturnValueOnce([
      {
        id: "00000000-0000-0000-0000-000000000020",
        content,
        conversation_id: "00000000-0000-0000-0000-000000000015",
        user_id: "00000000-0000-0000-0000-000000000010"
      }
    ]);
    client.mockReturnValueOnce([
      { id: "00000000-0000-0000-0000-000000000010" }
    ]);
    const { errors, data } = await addMessage.user({ input });
    expect(errors).toBeUndefined();
    expect(client).toMatchSnapshot();
    expect(client).toHaveBeenCalledTimes(4);
    expect(data).toEqual({
      addMessage: {
        status: "ok",
        message: {
          content: "hello world",
          user: { id: new User("00000000-0000-0000-0000-000000000010").id }
        }
      }
    });
  });

  it("when conversation not found", async () => {
    client.mockReturnValueOnce([]);
    const { errors } = await addMessage.user({ input });
    expect(errors[0].message).toBe("not found");
  });
});
