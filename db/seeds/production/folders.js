exports.seed = function(knex, Promise) {
  return knex('urls').del()
  .then(() => {
    return knex('folders').del();
  })
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
  })
  .then(() => {
    return Promise.all([
      knex('urls').insert({
        id: "HkrRLh2Ge",
        original_url: "www.facebook.com",
        short_url: "asdf.com",
        folder_id: 1,
        created_at: new Date
      }),
      knex('urls').insert({
        id: "asdfjkl",
        original_url: "www.twitter.com",
        short_url: "asdf.com",
        folder_id: 1,
        created_at: new Date
      }),
      knex('urls').insert({
        id: "qWeRtY",
        original_url: "www.instagram.com",
        short_url: "asdf.com",
        folder_id: 2,
        created_at: new Date
      })
    ]);
  })
};
