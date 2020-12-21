
exports.up = function(knex) {
    return knex.schema.createTable('reset_tokens', table => {
        table.increments('id')
        table.integer('user_id')
        table.string('token')
        table.dateTime('expiry_date')
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('reset_tokens')
};
