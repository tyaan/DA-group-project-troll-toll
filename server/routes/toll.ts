import express from 'express'
import { Toll } from '../../models/bridge.ts'
// import { JwtRequest } from '../auth0.ts'

import * as db from '../db/toll.ts'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const tolls: Toll[] | undefined = await db.getTolls()
    res.json(tolls)
  } catch (error) {
    console.error(error)
    res.status(500).send('Something went wrong')
  }
})

export default router
