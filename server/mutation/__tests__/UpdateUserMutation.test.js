import client from "../../model/client";
import User from "../../model/User";
import server, { mutation } from "../../__tests__";

const { updateUser } = mutation;

describe("UpdateUserMutation", () => {
  const userId = new User("00000000-0000-0000-0000-000000000010").id;
  const input = { userId, email: "update@chat.com" };

  afterAll(() => new Promise(() => server.close()));

  it("successfully updates when user is admin", async () => {
    client.mockReturnValueOnce([
      { id: "00000000-0000-0000-0000-000000000010" }
    ]);
    client.mockReturnValueOnce([1]);
    const { errors, data } = await updateUser.admin({ input });
    expect(errors).toBeUndefined();
    expect(client).toMatchSnapshot();
    expect(client).toHaveBeenCalledTimes(2);
    expect(data).toEqual({
      updateUser: {
        status: "ok",
        user: { id: userId }
      }
    });
  });

  it("successfully updated when user is self", async () => {
    client.mockReturnValueOnce([
      { id: "00000000-0000-0000-0000-000000000010" }
    ]);
    client.mockReturnValueOnce([1]);
    const { errors, data } = await updateUser.user({ input });
    expect(errors).toBeUndefined();
    expect(client).toHaveBeenCalledTimes(2);
    expect(data).toEqual({
      updateUser: {
        status: "ok",
        user: { id: userId }
      }
    });
  });

  it("when user is not owner", async () => {
    client.mockReturnValueOnce([
      {
        id: "00000000-0000-0000-0000-000000000015"
      }
    ]);
    const { errors } = await updateUser.user({
      input: {
        userId: new User("00000000-0000-0000-0000-000000000015").id,
        email: "update@chat.com"
      }
    });
    expect(errors[0].extensions.code).toBe("FORBIDDEN");
  });

  it("when user not found", async () => {
    client.mockReturnValueOnce([]);
    const { errors } = await updateUser.user({ input });
    expect(errors[0].message).toBe("not found");
  });
});
