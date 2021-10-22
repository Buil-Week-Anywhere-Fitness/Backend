const db = require("../../data/db-config");
const bcrypt = require("bcrypt");

function get() {
  return db("users")
    .join("roles", "users.role_id", "roles.role_id")
    .select("user_id", "username", "role_name");
}
async function findAll() {
  return db("users").select("users.username").from("users");
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

async function update(id, changes) {
  const hash = bcrypt.hashSync(changes.password, 8);
  changes.password = hash;

  const [updatedId] = await db("users")
    .where({ id })
    .update({
      username: changes.username,
      password: changes.password,
    })
    .returning("id");

  const updatedUser = await db("users").where({ id: updatedId }).first();

  // console.log(updatedUser)

  return updatedUser;
}

async function remove(id) {
  return db("users").where({ id }).del();
}

// async function add(user) {
//   const [id] = await db("users").insert(user);
//   return findById(id);
// }

async function add({ username, password, role_name }) {
  // done for you
  let created_user_id;
  await db.transaction(async (trx) => {
    let role_id_to_use;
    const [role] = await trx("roles").where("role_name", role_name);
    if (role) {
      role_id_to_use = role.role_id;
    } else {
      const [role_id] = await trx("roles").insert({ role_name: role_name });
      role_id_to_use = role_id;
    }
    const [user_id] = await trx("users").insert({
      username,
      password,
      role_id: role_id_to_use,
    });
    created_user_id = user_id;
  });
  return findById(created_user_id);
}

module.exports = {
  add,
  findAll,
  get,
  findBy,
  findById,
  update,
  remove,
};
