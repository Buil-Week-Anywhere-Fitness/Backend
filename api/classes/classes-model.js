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

async function update(id, changes) {
  await db("classes").where("class_id", id).update(changes);
  return getById(id)
}

function remove(id) {
  return db("classes").where("class_id", id).del();
}

//Client Model
function getClasses() {
  return db("client_classes");
}

function getClassesById(client_id) {
  return db("client_classes").where("client_class_id", client_id).first();
}

module.exports = {
  getAll,
  getById,
  add,
  update,
  remove,
  getClasses,
  getClassesById,
};
