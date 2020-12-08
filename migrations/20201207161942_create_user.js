
exports.up = function(knex) {
    return knex.schema.createTable('user', table => {
        table.increments('id')
        table.string('first_name', 100)
        table.string('last_name', 100)
        table.string('email', 200)
        table.string('phone', 20)
        table.boolean('status')

        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))        
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('user')
};
