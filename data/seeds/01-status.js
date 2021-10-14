const status = [{ status_name: "instructor" }, { status_name: "client" }];

exports.status = status;

exports.seed = function (knex) {
  return knex("status").insert(status);
};

// exports.seed = async function (knex) {
//   // Deletes ALL existing entries
//   await knex("users").truncate();

//   await knex("users").insert([
//     { role_name: "client" },
//     { role_name: "instructor" },
//   ]);

//   await knex("users").insert([
//     {
//       username: "Stan",
//       password: "$2a$10$dFwWjD8hi8K2I9/Y65MWi.WU0qn9eAVaiBoRSShTvuJVGw8XpsCiq", // password "1234"
//       role_id: 1,
//     },
//   ]);
// };
