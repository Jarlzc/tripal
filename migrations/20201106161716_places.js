
exports.up = function(knex) {
    return knex.schema.createTable('places', (table) => {
        table.increments('id').primary();
        table.integer('city_id').unsigned();
        table.foreign('city_id').references('city.id');
        table.string('place').notNullable();
        table.integer('type_id').unsigned();
        table.foreign('type_id').references('places_types.id');
        table.string('place_thumb');
        table.string('describe_s');
        table.string('describe_l')
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('places');
  };
