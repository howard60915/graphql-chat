const {
  POSTGRES_URL,
  POSTGRES_HOST,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_SSL,
  POSTGRES_SSL_CA,
  POSTGRES_SSL_KEY,
  POSTGRES_SSL_CERT
} = process.env;

let ssl = POSTGRES_SSL;
if (POSTGRES_SSL_CA) {
  ssl = {
    ca: POSTGRES_SSL_CA,
    key: POSTGRES_SSL_KEY,
    cert: POSTGRES_SSL_CERT
  };
}

module.exports = {
  client: "pg",
  connection: POSTGRES_URL || {
    host: POSTGRES_HOST || "127.0.0.1",
    user: POSTGRES_USER || "postgres",
    password: POSTGRES_PASSWORD || null,
    database: POSTGRES_DB || "chat",
    ssl
  }
};
