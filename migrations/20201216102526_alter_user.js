
exports.up = function(knex) {
    return knex.schema.table('user', table => {
        table.integer('role_id').unsigned().unique()
        table.foreign('role_id').references('role.id')
    });
};

exports.down = function(knex) {
    return knex.schema.alterTable('role_id', table => {
        table.dropColumn('role_id')
    });
};
