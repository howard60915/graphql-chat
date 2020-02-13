import _ from "lodash";
import { Client } from "graphql-shortcake";
import config from "../../knexfile";

const { connection } = config;
const poolConnection = _.isString(connection)
  ? { connectionString: connection }
  : connection;

export default new Client(poolConnection);
