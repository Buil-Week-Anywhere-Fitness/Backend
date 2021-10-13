// const db = require('../../data/dbConfig');

async function findAll() {
  return db("clients").orderBy("clients.id");
}

module.exports = {
  findAll,
};
