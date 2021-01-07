
exports.up = function(knex) {
    return knex.schema.createTable('users', (table) => {
        table.increments('id').primary();
        table.string('username').notNullable();
        table.string('email');
        table.string('password');
        table.string('profile_pic_url');
        table.timestamps(false, true);
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('users');
  };