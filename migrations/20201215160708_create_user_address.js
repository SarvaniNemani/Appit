
exports.up = function(knex) {
    return knex.schema.createTable('user_address', table => {
        table.increments('id')
        table.integer('user_id').unsigned().unique()
        table.foreign('user_id').references('user.id')
        table.string('street')
        table.string('state')
        table.string('zip')
    });
  
};

exports.down = function(knex) {
    return knex.schema.dropTable('user_address')
};