exports.up = knex =>
  knex.schema.createTable("user", table => {
    table
      .uuid("id")
      .primary()
      .defaultTo(knex.raw("uuid_generate_v4()"));
    table.string("email");
    table.jsonb("archive");
    table.timestamps();
    table.dateTime("deleted_at");
    table.uuid("created_by");
    table.uuid("updated_by");
    table.uuid("deleted_by");
  });

exports.down = knex => knex.schema.dropTable("user");
