
exports.up = function(knex) {
    return knex.schema.table('user', table => {
        table.string('username',100)
        table.string('password',200)
    });
};

exports.down = function(knex) {
    return knex.schema.alterTable('user', table => {
        table.dropColumn('username'),
        table.dropColumn('password')
    });
};

