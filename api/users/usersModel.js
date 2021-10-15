const db = require("../../data/db-config");

function get() {
  return db("users")
    .join("roles", "users.role_id", "roles.role_id")
    .select("user_id", "username", "role_name");
}

function findBy(filter) {
  return db("users")
    .join("roles", "users.role_id", "roles.role_id")
    .select("user_id", "username", "password", "role_name")
    .where(filter);
}

function findById(user_id) {
  return db("users as u")
    .join("roles as r", "u.role_id", "r.role_id")
    .select("u.user_id", "u.name", "u.username", "u.email", "r.role_name")
    .where("u.user_id", user_id)
    .first();
}

async function add(user) {
  const [id] = await db("users").insert(user);
  return findById(id);
}

module.exports = {
  add,
  get,
  findBy,
  findById,
};
