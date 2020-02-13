import { Client } from "graphql-shortcake";
import config from "../../knexfile";

export default new Client({ connectionString: config.connection });
