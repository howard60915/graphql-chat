exports.up = knex =>
  knex.schema.createTable("conversation", table => {
    table
      .uuid("id")
      .primary()
      .defaultTo(knex.raw("uuid_generate_v4()"));
    table.uuid("user_id");
    table.uuid("talker_id");
    table.jsonb("archive");
    table.timestamps();
    table.dateTime("deleted_at");
    table.uuid("created_by");
    table.uuid("updated_by");
    table.uuid("deleted_by");
  });

exports.down = knex => knex.schema.dropTable("conversation");
