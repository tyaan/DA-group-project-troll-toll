/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable('bridges', (table) => {
    table.increments('id').primary()
    table.string('name')
    table.string('location')
    table.string('type')
    table.integer('year_built')
    table.integer('length_meters')
    table.integer('lanes').nullable()
  })

  await knex.schema.createTable('toll_analytics', (table) => {
    table.integer('id').primary()
    table.integer('bridge_id')
    table.integer('user_id')
    table.decimal('revenue')
    table.datetime('timestamp')
  })

  await knex.schema.createTable('users', (table) => {
    table.integer('id').primary()
    table.string('auth0_sub')
    table.string('name')
    table.string('last_name')
    table.string('email')
    table.string('picture')
    table.integer('active_bridge')
    table.integer('fav_bridges')
    table.decimal('total_toll')
  })

  await knex.schema.createTable('favourites', (table) => {
    table.integer('id').primary()
    table.integer('user_id')
    table.integer('bridge_id')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTable('toll_analytics')
  await knex.schema.dropTable('bridges')
  await knex.schema.dropTable('users')
  await knex.schema.dropTable('favourites')
}
