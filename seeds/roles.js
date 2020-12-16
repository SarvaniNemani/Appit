
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('role').del()
    .then(function () {
      // Inserts seed entries
      return knex('role').insert([
        {id: 1, key: 'user', name: 'User'},
        {id: 2, key: 'admin', name: 'Admin'},
        {id: 3, key: 'superadmin', name: 'SuperAdmin'}
      ]);
    });
};
