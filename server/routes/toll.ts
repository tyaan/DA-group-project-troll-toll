import express from 'express'
import { Toll, TollData } from '../../models/toll.ts'
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

router.get('/:auth0_sub', async (req, res) => {
  try {
    const {"auth0_sub": auth0Sub} = req.params
    const tolls: Toll[] | undefined = await db.getTollsByUserAuth0Sub(auth0Sub)
    res.json(tolls)
  }catch (err) {
    console.error(err)
    res.status(500).send('Something went wrong')
  }
}
)

router.get('/bridge/:bridge_id', async (req, res) => {
  try {
    const {"bridge_id": bridgeId} = req.params
    const tolls: Toll[] | undefined = await db.getTollsByBridgeId(Number(bridgeId))
    res.json(tolls)
  }catch (err) {
    console.error(err)
    res.status(500).send('Something went wrong')
  }
}
)

router.patch('/', async (req, res) => {
  try{
    const tollData: TollData = req.body
    console.log(tollData)
    const newToll: Toll | undefined = await db.addToll(tollData)
    res.json(newToll)
  } catch (err) {
    console.error(err)
    res.status(500).send('Something went wrong')
  }
})

export default router
