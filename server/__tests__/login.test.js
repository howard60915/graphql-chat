import axios from "axios";
import server from "../graphql";
import client from "../model/client";
import User from "../model/User";

const authURL = "http://127.0.0.1:4000/auth";

describe("auth", () => {
  let refreshToken;
  const correlationId = "00000000-0000-0000-0000-000000000100";

  beforeAll(() => server.start());

  afterAll(() => server.close());

  describe("sign in", () => {
    const body = { email: "howhow@howfun.co", password: "howhowno1" };
    const user = new User(body);

    const request = (data, id) =>
      axios.post(
        authURL,
        { ...data, method: "signIn" },
        { headers: { cookie: `x-correlation-id=${id || ""}` } }
      );

    it("successfully signIn", async () => {
      client.mockReturnValueOnce([
        {
          id: "00000000-0000-0000-0000-000000000010",
          email: "howhow@howfun.co",
          archive: { password: user.password.value }
        }
      ]);
      const { data } = await request(body, correlationId);
      expect(data.refreshToken).not.toBeUndefined();
      expect(data.accessToken).not.toBeUndefined();
      expect(data).toEqual(
        expect.objectContaining({
          user: expect.objectContaining({
            id: "00000000-0000-0000-0000-000000000010"
          })
        })
      );
      expect(client).toMatchSnapshot();
      expect(client).toHaveBeenCalledTimes(1);
      ({ refreshToken } = data);
    });

    it("signIn with wrong password", async () => {
      client.mockReturnValueOnce([
        {
          id: "00000000-0000-0000-0000-000000000010",
          email: "howhow@howfun.co",
          archive: { password: user.password.value }
        }
      ]);
      await expect(
        request({
          email: "howhow@howfun.co",
          password: "howhowsuck"
        })
      ).rejects.toEqual(new Error("Request failed with status code 403"));
    });
  });
  describe("sign out", () => {
    const request = (data, id) =>
      axios.post(
        authURL,
        {
          ...data,
          method: "signOut"
        },
        { headers: { cookie: `x-correlation-id=${id || ""}` } }
      );

    it("successfully signOut", async () => {
      const { headers, data } = await request({}, correlationId);
      expect(data.status).toBe("ok");
      expect(client).toHaveBeenCalledTimes(0);
      expect(headers["set-cookie"]).toBeUndefined();
    });
  });
  describe("renew", () => {
    const request = (data, id) =>
      axios.post(
        authURL,
        {
          ...data,
          method: "renew"
        },
        { headers: { cookie: `x-correlation-id=${id || ""}` } }
      );

    it("successfully renew", async () => {
      client.mockReturnValueOnce([
        {
          id: "00000000-0000-0000-0000-000000000010",
          email: "howhow@howfun.co"
        }
      ]);
      const { data } = await request({ refreshToken }, correlationId);
      expect(data.refreshToken).not.toBeUndefined();
      expect(data.accessToken).not.toBeUndefined();
      expect(data).toEqual(
        expect.objectContaining({
          user: expect.objectContaining({
            id: "00000000-0000-0000-0000-000000000010"
          })
        })
      );
      expect(client).toMatchSnapshot();
      expect(client).toHaveBeenCalledTimes(1);
    });

    it("user not found", async () => {
      await expect(request({ refreshToken })).rejects.toEqual(
        new Error("Request failed with status code 403")
      );
    });
  });
});
