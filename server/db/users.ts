const db = require('./connection') // Your database connection

// Get a user by their Auth0 sub
function getUserByAuth0Sub(auth0_sub) {
  return db('users').where({ auth0_sub }).first()
}

// Add a new user
function addUser(user) {
  return db('users').insert(user).returning('*')
}

module.exports = {
  getUserByAuth0Sub,
  addUser,
}
