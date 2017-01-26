exports.seed = function(knex, Promise) {
  return knex('folders').del()
  .then(() => {
    return Promise.all([
      knex('folders').insert({
        id: 1,
        folder_name: 'Folder 1',
        created_at: new Date
      }),
      knex('folders').insert({
        id: 2,
        folder_name: 'Folder 2',
        created_at: new Date
      })
    ]);
  });
};
