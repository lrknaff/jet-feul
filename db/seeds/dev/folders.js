exports.seed = function(knex, Promise) {
  return knex('urls').del()
  .then(() => {
    return knex('folders').del();
  })
  .then(() => {
    return Promise.all([
      knex('folders').insert({
        folder_name: 'Folder 1',
        created_at: new Date
      }),
      knex('folders').insert({
        folder_name: 'Folder 2',
        created_at: new Date
      })
    ]);
  })
  .then(() => {
    return Promise.all([
      knex('urls').insert({
        original_url: "www.facebook.com",
        short_url: "asdf.com",
        folder_id: 1,
        created_at: new Date
      }),
      knex('urls').insert({
        original_url: "www.twitter.com",
        short_url: "asdf.com",
        folder_id: 2,
        created_at: new Date
      }),
      knex('urls').insert({
        original_url: "www.instagram.com",
        short_url: "asdf.com",
        folder_id: 3,
        created_at: new Date
      })
    ]);
  })
};
