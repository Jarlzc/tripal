
exports.up = function(knex) {
    return knex.schema.createTable('chatroom_content', (table) => {
        table.increments('id').primary();
        table.integer('request_id').unsigned();
        table.foreign('request_id').references('requests.id');
        table.integer('user_id').unsigned();
        table.foreign('user_id').references('users.id');
        table.string('chat_msg').notNullable();
        table.string('msg_time');
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('chatroom_content');
  };
  