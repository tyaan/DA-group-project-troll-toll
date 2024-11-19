import knexfile from '../knexfile'

export async function up(knex) {
  await knex.schema.createTable('bridges', (table) => {
    table.increments('id').primary()
    table.string('name')
    table.string('location')
    table.string('type')
    table.integer('year_built')
    table.integer('length_meters')
    table.integer('lanes').nullable()
    table.string('added_by_user')
  })

  await knex.schema.createTable('toll_analytics', (table) => {
    table.integer('id').primary()
    table.integer('bridgeId')
    table.decimal('revenue')
    table.datetime('timestamp')
  })

  await knexfile.schema.createTable('users', (table) => {
    table.integer('id').primary()
    table.string('auth0_sub')
    table.string('name')
    table.string('last_name')
    table.string('email')
    table.string('image')
    table.integer('active_bridges')
    table.integer('fav_bridges')
    table.decimal('total_toll')
  })
}

export async function down(knex) {
  await knex.schema.dropTable('toll_analytics')
  await knex.schema.dropTable('bridges')
}
