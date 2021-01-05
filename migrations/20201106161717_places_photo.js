
exports.up = function(knex) {
    return knex.schema.createTable('places_photo', (table) => {
        table.increments('id').primary();
        table.integer('places_id').unsigned();
        table.foreign('places_id').references('places.id');
        table.string('photo_url').notNullable()
        
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('places_photo');
  };
