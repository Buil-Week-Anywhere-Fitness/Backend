const db = require("../../data/db-config");

function getAll() {
  return db("classes");
}

function getById(id) {
  return db("classes").where("class_id", id).first();
}

async function add(newClass) {
  await db("classes").insert(newClass);
  return "Done"
}

async function update(id, changes) {
  await db("classes").where("class_id", id).update(changes);
  return getById(id);
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
