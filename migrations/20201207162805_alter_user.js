
exports.up = function(knex) {
    return knex.schema.table('user',table=> {
        table.string('full_name',200)
    });
};

exports.down = function(knex) {
    return knex.schema.alterTable('user', table => {
        table.dropColumn('full_name')
    });
};
