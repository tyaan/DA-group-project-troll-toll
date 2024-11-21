export async function seed(knex) {
  await knex('favourites').insert([
    { id: 1, user_id: 'google-oauth2|107351311981836419703', bridge_id: 2 },
    { id: 2, user_id: 3, bridge_id: 4 },
    { id: 3, user_id: 5, bridge_id: 6 },
    { id: 4, user_id: 7, bridge_id: 8 },
    { id: 5, user_id: 9, bridge_id: 10 },
    { id: 6, user_id: 2, bridge_id: 1 },
    { id: 7, user_id: 4, bridge_id: 3 },
    { id: 8, user_id: 6, bridge_id: 5 },
    { id: 9, user_id: 8, bridge_id: 7 },
    { id: 10, user_id: 10, bridge_id: 9 },
  ])
}
