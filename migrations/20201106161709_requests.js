exports.up = function(knex) {
    return knex.schema.createTable('requests', (table) => {
        table.increments('id').primary();
        table.integer('user_id').unsigned();
        table.foreign('user_id').references('users.id');
        table.integer('place_id');
        table.date('planned_date');
        table.string('request_title').notNullable();
        table.string('request_msg');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('requests');
};
