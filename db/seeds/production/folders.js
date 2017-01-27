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
      })
      .returning(['id'])
      .then((payload) => {
        return Promise.all([
          knex('urls').insert({
            original_url: "www.facebook.com",
            short_url: "asdf.com",
            folder_id: payload[0].id,
            times_visited: 10,
            created_at: new Date
          }),
          knex('urls').insert({
            original_url: "www.twitter.com",
            short_url: "asdf.com",
            folder_id: payload[0].id,
            times_visited: 108,
            created_at: new Date
          })
        ])
      }),
      knex('folders').insert({
        folder_name: 'Folder 2',
        created_at: new Date
      })
      .returning(['id'])
      .then((payload) => {
        return Promise.all([
          knex('urls').insert({
            original_url: "www.google.com",
            short_url: "asdf.com",
            folder_id: payload[0].id,
            times_visited: 88,
            created_at: new Date
          }),
          knex('urls').insert({
            original_url: "www.apple.com",
            short_url: "asdf.com",
            folder_id: payload[0].id,
            times_visited: 26,
            created_at: new Date
          })
        ])
      })
    ])
  })
};
