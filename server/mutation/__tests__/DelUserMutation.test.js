import client from "../../model/client";
import User from "../../model/User";
import server, { mutation } from "../../__tests__";

const { delUser } = mutation;

describe("DelUserMutation", () => {
  const userId = new User("00000000-0000-0000-0000-000000000010").id;
  const input = { userId };

  afterAll(() => new Promise(() => server.close()));

  it("successfully delete when user is admin", async () => {
    client.mockReturnValueOnce([
      { id: "00000000-0000-0000-0000-000000000010" }
    ]);
    client.mockReturnValueOnce([1]);
    const { errors, data } = await delUser.admin({ input });
    expect(errors).toBeUndefined();
    expect(client).toMatchSnapshot();
    expect(client).toHaveBeenCalledTimes(2);
    expect(data).toEqual({
      delUser: {
        status: "ok",
        user: { id: userId }
      }
    });
  });

  it("successfully delete when user is self", async () => {
    client.mockReturnValueOnce([
      { id: "00000000-0000-0000-0000-000000000010" }
    ]);
    client.mockReturnValueOnce([1]);
    const { errors, data } = await delUser.user({ input });
    expect(errors).toBeUndefined();
    expect(client).toHaveBeenCalledTimes(2);
    expect(data).toEqual({
      delUser: {
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
    const { errors } = await delUser.user({
      input: {
        userId: new User("00000000-0000-0000-0000-000000000015").id
      }
    });
    expect(errors[0].extensions.code).toBe("FORBIDDEN");
  });

  it("when user not found", async () => {
    client.mockReturnValueOnce([]);
    const { errors } = await delUser.user({ input });
    expect(errors[0].message).toBe("not found");
  });
});
