const db = require("../data/db-config");
// const bcrypt = require("bcrypt");

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});
beforeEach(async () => {
  await db.seed.run();
});
afterAll(async () => {
  await db.destroy();
});

it("[0] sanity check", () => {
  expect(true).not.toBe(false);
});

describe("server.js", () => {
  describe("[POST] /api/auth/login", () => {
    it("[1] responds with the correct message on valid credentials", async () => {
      // const res = await request(server);
      // .post("/api/auth/login");
      // .send({ username: "stan", password: "1234" });
      // expect(res.body.message).toMatch(/welcome stan/i);
    }, 750);
  });
});
