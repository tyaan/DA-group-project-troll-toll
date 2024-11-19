export async function seed(knex) {
  await knex('users').insert([
    {
      name: 'Thorgar',
      auth0_sub: '1',
      last_name: 'Frostpeak',
      email: 'troll1@gmail.com',
      image: '',
      active_bridge: 'Onehunga Harbour Road Bridge',
      fav_bridges: 'Onepoto Bridge',
      total_toll: 86,
    },

    {
      name: 'Berga',
      auth0_sub: '2',
      last_name: 'Fluntfist',
      email: 'troll2@gmail.com',
      image: '',
      active_bridge: 'Auckland Harbour Bridge',
      fav_bridges: 'Grafton Bridge',
      total_toll: 122,
    },

    {
      name: 'Roknar',
      auth0_sub: '3',
      last_name: 'Rockridge',
      email: 'troll3@gmail.com',
      image: '',
      active_bridge: 'Jacobs Ladder Bridge',
      fav_bridges: 'Panmure Bridge',
      total_toll: 40,
    },
    {
      name: 'Cragspine',
      auth0_sub: '4',
      last_name: 'Morndul',
      email: 'troll4@gmail.com',
      image: '',
      active_bridge: 'Tamaki Bridge',
      fav_bridges: 'Tamaki Bridge',
      total_toll: 250,
    },
    {
      name: 'ledgefoot',
      auth0_sub: '5',
      last_name: 'Mountainmaw',
      email: 'troll5@gmail.com',
      image: '',
      active_bridge: 'Victoria Park Viaduct',
      fav_bridges: 'Auckland Harbour Bridge',
      total_toll: 100,
    },

    {
      name: 'Ledgefoot',
      auth0_sub: '6',
      last_name: 'Iceshard',
      email: 'troll6@gmail.com',
      image: '',
      active_bridge: 'Newmarket Viaduct',
      fav_bridges: 'Tamaki Bridge',
      total_toll: 120,
    },
    {
      name: 'SnowMantle',
      auth0_sub: '7',
      last_name: 'Mountainmaw',
      email: 'troll7@gmail.com',
      image: '',
      active_bridge: 'Māngere Bridge',
      fav_bridges: 'Westgate Pedestrian and Cycle Bridge',
      total_toll: 10,
    },

    {
      name: 'Terragar',
      auth0_sub: '8',
      last_name: 'Cragtooth',
      email: 'troll8@gmail.com',
      image: '',
      active_bridge: 'Panmure Bridge',
      fav_bridges: 'Tamaki Bridge',
      total_toll: 90,
    },
    {
      name: 'Bouldershoulder',
      auth0_sub: '9',
      last_name: 'GravelFoot',
      email: 'troll10@gmail.com',
      image: '',
      active_bridge: 'Wynyard Crossing',
      fav_bridges: 'Māngere Bridge',
      total_toll: 110,
    },

    {
      name: 'Mounta',
      auth0_sub: '10',
      last_name: 'Frostpeak',
      email: 'troll10@gmail.com',
      image: '',
      active_bridge: 'Wynyard Crossing',
      fav_bridges: 'Panmure Bridge',
      total_toll: 175,
    },

    {
      name: 'Skarn',
      auth0_sub: '11',
      last_name: 'Tundar',
      email: 'troll11@gmail.com',
      image: '',
      active_bridge: 'Upper Harbour Bridge',
      fav_bridges: 'Upper Harbour Bridge',
      total_toll: 175,
    },
    {
      name: 'Slatefist',
      auth0_sub: '12',
      last_name: 'Terra',
      email: 'troll12@gmail.com',
      image: '',
      active_bridge: 'Newmarket Viaduct',
      fav_bridges: 'Newmarket Viaduct',
      total_toll: 185,
    },

    {
      name: 'Stoneclaw',
      auth0_sub: '13',
      last_name: 'Frostpeak',
      email: 'troll13@gmail.com',
      image: '',
      active_bridge: 'Upper Harbour Bridge',
      fav_bridges: 'Victoria Park Viaduct',
      total_toll: 135,
    },
    {
      name: 'Cliffsnout',
      auth0_sub: '14',
      last_name: 'Cliffsnout',
      email: 'troll14@gmail.com',
      image: '',
      active_bridge: 'Grafton Bridge',
      fav_bridges: 'Panmure Bridge',
      total_toll: 200,
    },

    {
      name: 'Highcrag',
      auth0_sub: '15',
      last_name: 'woodpeak',
      email: 'troll15@gmail.com',
      image: '',
      fav_bridges: 'Tāmaki Bridge',
      total_toll: 175,
    },
  ])
}
