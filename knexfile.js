const pg = require("pg");

if (process.env.DATABASE_URL) {
  pg.defaults.ssl = { rejectUnauthorized: false };
}

const common = {
  migrations: { directory: "./data/migrations" },
  seeds: { directory: "./data/seeds" },
};

module.exports = {
  development: {
    ...common,
    useNullAsDefault: true,
    client: "sqlite3",
    connection: {
      filename: "./data/anywhere_fitness.db3",
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run("PRAGMA foreign_keys = ON", done);
      },
    },
  },
  testing: {
    ...common,
    useNullAsDefault: true,
    client: "sqlite3",
    connection: {
      filename: "./data/test.db3",
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run("PRAGMA foreign_keys = ON", done);
      },
    },
  },
  // production: {
  //   ...common,
  //   useNullAsDefault: true,
  //   client: "sqlite3",
  //   connection: {
  //     filename: "./data/anywhere_fitness.db3",
  //   },
  //   pool: {
  //     afterCreate: (conn, done) => {
  //       conn.run("PRAGMA foreign_keys = ON", done);
  //     },
  //   },
  // },
  production: {
    ...common,
    client: "pg",
    connection: process.env.DATABASE_URL,
    pool: { min: 2, max: 10 },
  },
};
