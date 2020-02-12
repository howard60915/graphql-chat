import client from "../../model/client";
import User from "../../model/User";
import server, { mutation } from "../../__tests__";

const { registerByEmail } = mutation;

describe("register user by email mutation", () => {
  const email = "hello@tmot.com";
  const input = { email, password: "password" };

  afterAll(() => new Promise(() => server.close()));

  it("register when user does not exist", async () => {
    client.mockReturnValueOnce([]);
    client.mockReturnValueOnce([
      {
        id: "00000000-0000-0000-0000-000000000030",
        email: "hello@tmot.com"
      }
    ]);
    const { errors, data } = await registerByEmail({ input });
    expect(errors).toBeUndefined();
    expect(client).toHaveBeenCalledTimes(2);
    expect(client).toMatchSnapshot();
    expect(data.registerByEmail.user).toEqual({
      id: new User("00000000-0000-0000-0000-000000000030").id,
      email: "hello@tmot.com"
    });
  });

  it("sign when user is existed", async () => {
    client.mockReturnValueOnce([
      {
        id: "00000000-0000-0000-0000-000000000030",
        email: "hello@tmot.com"
      }
    ]);
    const { errors } = await registerByEmail({ input });
    expect(errors[0].message).toBe("user is existed");
    expect(client).toHaveBeenCalledTimes(1);
    expect(client).toMatchSnapshot();
  });
});
