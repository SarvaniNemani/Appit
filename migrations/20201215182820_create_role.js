
exports.up = function(knex) {
    return knex.schema.createTable('role', table => {
        table.integer('id').unsigned().primary()
        table.string('key')
        table.string('name')
    })
  
};

exports.down = function(knex) {
    return knex.schema.dropTable('role')
};
