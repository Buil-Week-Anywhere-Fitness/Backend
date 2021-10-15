const db = require("../../data/db-config");

function getAll() {
  return db("classes");
}

function getById(id) {
  return db("classes").where("class_id", id).first();
}

async function add(newClass) {
  const [id] = await db("classes").insert(newClass);
  return getById(id);
}

function update(id, changes) {
  return db("classes").where("class_id", id).update(changes);
}

function remove(id) {
  return db("classes").where("class_id", id).del();
}

module.exports = {
  getAll,
  getById,
  add,
  update,
  remove,
};
