
exports.up = function(knex) {
    return knex.schema.createTable('user_refresh_token', table => {
        table.increments('id')
        table.string('user_id')
        table.string('refresh_token')
        table.datetime('expiry_date')

        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
    });
  
};

exports.down = function(knex) {
    return knex.schema.dropTable('user_refresh_token')
  
};