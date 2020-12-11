
exports.up = function(knex) {
    return knex.schema.table('user_access_token', table => {
        table.datetime('expiry_date')
    });
};

exports.down = function(knex) {
    return knex.schema.alterTable('user_access_token', table => {
        table.dropColumn('expiry_date')
    });
};
