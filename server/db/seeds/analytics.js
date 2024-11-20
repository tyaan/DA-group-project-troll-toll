export async function seed(knex) {
  await knex('toll_analytics').insert([
    {
      bridge_id: 1,
      user_id: 13,
      revenue: 300,
      timestamp: null,
    },

    {
      bridge_id: 2,
      user_id: 12,
      revenue: 220,
      timestamp: null,
    },

    {
      bridge_id: 3,
      user_id: 13,
      revenue: 230,
      timestamp: null,
    },

    {
      bridge_id: 4,
      user_id: 12,
      revenue: 320,
      timestamp: null,
    },

    {
      bridge_id: 5,
      user_id: 11,
      revenue: 290,
      timestamp: null,
    },

    {
      bridge_id: 6,
      user_id: 10,
      revenue: 120,
      timestamp: null,
    },

    {
      bridge_id: 7,
      user_id: 11,
      revenue: 220,
      timestamp: null,
    },

    {
      bridge_id: 8,
      user_id: 9,
      revenue: 110,
      timestamp: null,
    },

    {
      bridge_id: 9,
      user_id: 8,
      revenue: 90,
      timestamp: null,
    },

    {
      bridge_id: 10,
      user_id: 7,
      revenue: 139,
      timestamp: null,
    },

    {
      bridge_id: 11,
      user_id: 6,
      revenue: 233,
      timestamp: null,
    },

    {
      bridge_id: 12,
      user_id: 5,
      revenue: 320,
      timestamp: null,
    },

    {
      bridge_id: 13,
      user_id: 4,
      revenue: 300,
      timestamp: null,
    },
    {
      bridge_id: 1,
      user_id: 3,
      revenue: 210,
      timestamp: null,
    },

    {
      bridge_id: 2,
      user_id: 2,
      revenue: 295,
      timestamp: null,
    },
    {
      bridge_id: 3,
      user_id: 1,
      revenue: 220,
      timestamp: null,
    },
  ])
}
