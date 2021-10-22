const roles = [{ role_name: "instructor" }, { role_name: "client" }];

exports.roles = roles;

exports.seed = function (knex) {
  return knex("roles").insert(roles);
};
