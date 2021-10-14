it("[0] sanity check", () => {
  expect(true).not.toBe(false);
});

const db = require("../data/db-config");
const bcrypt = require("bcrypt");
const server = require("./server");
const request = require("supertest");

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

test("Proper database env variable is set", () => {
  expect(process.env.NODE_ENV).toBe("testing");
});

describe("server", () => {
  describe("getById()", () => {
    test("retrieves user by ID", () => {});
  });

  describe("[POST] /api/auth/login", () => {
    test("[error] - responds with the correct message on valid credentials", async () => {
      // const res = await request(server)
      //   .post("/api/auth/login")
      //   .send({ username: "stan", password: "1234" });
      // expect(res.body.message).toMatch(/welcome stan/i);
    }, 750);
  });

  describe("[POST] /api/users", () => {
    test("[error] responds with a new user", async () => {
      // const newUser = { name: "foo", bio: "bar" };
      // const res = await request(server).post("/api/users").send(newUser);
      // expect(res.body).toHaveProperty("id");
      // expect(res.body).toMatchObject(newUser);
    }, 750);
  });
});
