exports.up = function (knex) {
    return knex.schema.createTable('city', (table) => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('describe');
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('city');
};