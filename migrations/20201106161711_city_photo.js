
exports.up = function(knex) {
    return knex.schema.createTable('city_photo', (table) => {
        table.increments('id').primary();
        table.integer('city_id').unsigned();
        table.foreign('city_id').references('city.id')
        table.string('photo_link').notNullable();;
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('city_photo');
};