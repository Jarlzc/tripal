
exports.up = function(knex) {
    return knex.schema.createTable('places_types', (table) => {
        table.increments('id').primary();
        table.string('type').notNullable();

    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('places_types');
  };

