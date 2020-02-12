import client from "../../model/client";
import User from "../../model/User";
import server, { query } from "../../__tests__";

const { queryUsers } = query;

describe("users query", () => {
  afterAll(() => new Promise(() => server.close()));

  it("successfully query", async () => {
    client.mockReturnValueOnce([
      {
        id: "00000000-0000-0000-0000-000000000020"
      }
    ]);

    const { errors, data } = await queryUsers.user();
    expect(data.users[0]).toEqual(
      expect.objectContaining({
        id: new User("00000000-0000-0000-0000-000000000020").id
      })
    );
    expect(errors).toBeUndefined();
    expect(client).toMatchSnapshot();
    expect(client).toHaveBeenCalledTimes(1);
  });
});
