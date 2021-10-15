exports.up = function (knex) {
  return knex.schema
    .createTable("roles", (tbl) => {
      tbl.increments("role_id");
      tbl.string("role_name", 128).unique().notNullable();
    })
    .createTable("users", (tbl) => {
      tbl.increments("user_id");
      tbl.string("name", 128).unique().notNullable();
      tbl.string("username", 64).unique().notNullable();
      tbl.string("email", 128).unique().notNullable();
      tbl.string("password", 128).notNullable();
      tbl.integer("punch_count").defaultTo(0);
      tbl
        .integer("role_id")
        .unsigned()
        .notNullable()
        .references("role_id")
        .inTable("roles")
        .onUpdate("RESTRICT")
        .onDelete("RESTRICT");
    })
    .createTable("classes", (tbl) => {
      tbl.increments("class_id");
      tbl.string("class_name", 128).notNullable();
      tbl.string("class_type", 128).notNullable();
      tbl.string("class_date").notNullable();
      tbl.string("start_time").notNullable();
      tbl.string("duration").notNullable();
      tbl.string("intensity").notNullable();
      tbl.string("location").notNullable();
      tbl.integer("current_attendance");
      tbl.integer("max_class_size").notNullable();
      tbl
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("user_id")
        .inTable("users")
        .onUpdate("RESTRICT")
        .onDelete("RESTRICT");
    })
    .createTable("client_classes", (tbl) => {
      tbl.increments("client_classes_id");
      tbl
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("user_id")
        .inTable("users")
        .onUpdate("RESTRICT")
        .onDelete("RESTRICT");
      tbl
        .integer("class_id")
        .unsigned()
        .notNullable()
        .references("class_id")
        .inTable("classes")
        .onUpdate("RESTRICT")
        .onDelete("RESTRICT");
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("client_classes")
    .dropTableIfExists("classes")
    .dropTableIfExists("users")
    .dropTableIfExists("roles");
};
