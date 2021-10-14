const status = [{ status_name: "instructor" }, { status_name: "client" }];

exports.status = status;

exports.seed = function (knex) {
  return knex("status").insert(status);
};
