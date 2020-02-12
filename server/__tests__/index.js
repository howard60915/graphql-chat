import _ from "lodash";
import axios from "axios";
import Jwt from "../auth";
import Query from "./query";
import Mutation from "./mutation";
import server from "../graphql";
import User from "../model/User";

server.start({
  port: 8080,
  endpoint: "/graphql"
});

const baseURL = "http://127.0.0.1:8080/graphql";

const guest = axios.create({ baseURL });

const user = axios.create({
  baseURL,
  headers: {
    authorization: `Bearer ${Jwt.signAccess({
      user: {
        id: "00000000-0000-0000-0000-000000000010",
        email: "hello@chat.com",
        archive: { password: new User({ password: "XYZ" }).password.value }
      }
    })}`
  }
});

const admin = axios.create({
  baseURL,
  headers: {
    authorization: `Bearer ${Jwt.signAccess({
      user: {
        id: "00000000-0000-0000-0000-000000000001",
        email: "admin@chat.com",
        archive: {
          password: new User({ password: "XYZ" }).password.value,
          isAdmin: true
        }
      }
    })}`
  }
});

async function handleReq(operator, queryBody) {
  try {
    const { data } = await operator.post("", queryBody);
    return data;
  } catch (e) {
    return _.get(e, ["response", "data"]) || e.response || e;
  }
}

const req = query => {
  const instance = variables => handleReq(guest, { query, variables });
  instance.user = variables => handleReq(user, { query, variables });
  instance.admin = variables => handleReq(admin, { query, variables });

  return instance;
};

export default server;
export const query = Query(req);
export const mutation = Mutation(req);
