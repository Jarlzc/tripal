
exports.up = function(knex) {
    return knex.schema.createTable('user_places_period', (table) => {
        table.increments('id').primary();
        table.integer('user_id').unsigned();
        table.foreign('user_id').references('users.id');
        table.integer('places_id').unsigned();
        table.foreign('places_id').references('places.id');
        table.date('period_start');
        table.date('period_end');
        table.timestamps(false, true);
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('user_places_period');
  };