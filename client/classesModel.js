const db = require("../data/db-config");

function getAll() {
  return db("classes").orderBy("class.id");
}

function getById(id) {
  return db("classes").where("client_class_id", id).first();
}

async function add(newClientClass) {
  const [id] = await db("client_class").insert(newClientClass);
  return getById(id);
}

async function update(id, changes) {
  await db("classes").where("client_class_id", id).update(changes);
  return getById(id);
}

function remove(id) {
  return db("classes").where("client_class_id", id).del();
}

module.exports = {
  getAll,
  getById,
  add,
  update,
  remove,
};
