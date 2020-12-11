
exports.up = function(knex) {
    return knex.schema.table('user_refresh_token', table => {
        table.string('access_token')
    });
};

exports.down = function(knex) {
    return knex.schema.alterTable('user_refresh_token', table => {
        table.dropColumn('access_token')
    });
};