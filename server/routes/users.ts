
const express = require('express')
const db = require('../db/users') // Create this db file for database operations
const router = express.Router()

// POST /api/users/register
router.post('/register', async (req, res) => {
  const { auth0_sub, name, last_name, email, picture } = req.body

  try {
    // Check if user already exists
    const existingUser = await db.getUserByAuth0Sub(auth0_sub)
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' }) // Conflict
    }

    // Register new user
    const newUser = {
      auth0_sub,
      name,
      last_name,
      email,
      picture,
      active_bridge: null, // Default values
      fav_bridges: null,
      total_toll: 0.0,
    }
    const createdUser = await db.addUser(newUser)
    res.status(201).json(createdUser) // Created
  } catch (err) {
    res.status(500).json({ message: 'Failed to register user', error: err.message })
  }
})

module.exports = router
