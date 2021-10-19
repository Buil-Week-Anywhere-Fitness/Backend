const common = {
  useNullAsDefault: true,
  migrations: { directory: "./data/migrations" },
  seeds: { directory: "./data/seeds" },
  pool: {
    afterCreate: (conn, done) => {
      conn.run("PRAGMA foreign_keys = ON", done);
    },
  },
};

module.exports = {
  development: {
    ...common,
    client: "sqlite3",
    connection: {
      filename: "./data/anywhere_fitness.db3",
    },
  },
  testing: {
    ...common,
    client: "sqlite3",
    connection: {
      filename: "./data/test.db3",
    },
  },
  production: {
    ...common,
    client: "pg",
    connection: process.env.DATABASE_URL,
  },
};
