
exports.up = function(knex) {
    return knex.schema.table('user',table=> {
        table.index('status')
    });
};

exports.down = function(knex) {
    return knex.schema.alterTable('user', table => {
        table.dropIndex('status')
    });
};
