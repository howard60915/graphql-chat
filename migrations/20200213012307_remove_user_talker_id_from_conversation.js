exports.up = knex =>
  knex.schema.table("conversation", table => {
    table.dropColumn("user_id");
    table.dropColumn("talker_id");
    table.string("name");
  });

exports.down = knex =>
  knex.schema.table("conversation", table => {
    table.uuid("user_id");
    table.uuid("talker_id");
    table.dropColumn("name");
  });
