exports.up = knex =>
  knex.schema.createTable("user_conversation", table => {
    table
      .uuid("id")
      .primary()
      .defaultTo(knex.raw("uuid_generate_v4()"));
    table.uuid("user_id");
    table.uuid("conversation_id");
    table.timestamps();
    table.uuid("created_by");
    table.uuid("updated_by");
  });

exports.down = knex => knex.schema.dropTable("user_conversation");
