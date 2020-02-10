import { Client } from "pg";
import { mock } from "graphql-shortcake";
import knex from "knex";
import config from "../../../knexfile";

const { POSTGRES_HOST } = process.env;

const client = jest.requireActual("../client").default;

const db = knex(config);

const mockClient = mock(client);

mockClient.reset = async name => {
  const pgClient = new Client({
    host: POSTGRES_HOST || "127.0.0.1",
    user: "postgres",
    password: null,
    database: "postgres"
  });
  await pgClient.connect();
  await pgClient.query(`DROP DATABASE IF EXISTS ${name}`);
  await pgClient.query(`CREATE DATABASE ${name}`);
  await pgClient.end();
  await db.migrate.latest();
};

export default mockClient;
