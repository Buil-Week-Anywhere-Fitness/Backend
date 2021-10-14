// Update with your config settings.

module.exports = {
  development: {
    client: "sqlite3",
    migrations: {
      directory: "./data/migrations",
    },
    seeds: {
      directory: "./data/seeds",
    },
    connection: {
      filename: "./data/anywhere_fitness.db3",
    },
    useNullAsDefault: true,
  },
  pool: {
    afterCreate: (conn, done) => {
      conn.run("PRAGMA foreign_keys = ON", done);
    },
  },
};
