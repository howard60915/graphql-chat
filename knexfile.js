const {
  DATABASE_URL,
  DATABASE_HOST,
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_DB
} = process.env;

module.exports = {
  client: "pg",
  connection: DATABASE_URL || {
    host: DATABASE_HOST || "127.0.0.1",
    user: DATABASE_USER || "postgres",
    password: DATABASE_PASSWORD || null,
    database: DATABASE_DB || "chat"
  }
};
