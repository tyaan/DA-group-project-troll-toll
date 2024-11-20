import express from 'express'
import { Bridge, BridgeData } from '../../models/bridge.ts'
// import { JwtRequest } from '../auth0.ts'

import * as db from '../db/bridge.ts'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const bridges = await db.getBridges()
    res.json(bridges)
  } catch (error) {
    console.error(error)
    res.status(500).send('Something went wrong')
  }
})

router.get('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const bridge = await db.getBridgeById(Number(id))
    if (!bridge) {
      return res.status(404).send('Bridge not found')
    }
    res.json(bridge)
  } catch (error) {
    console.error(error)
    res.status(500).send('Something went wrong')
  }
})


router.post('/', async (req, res) => {
  const newBridge: BridgeData = req.body
  try {
    const createdBridge = await db.addBridge(newBridge)
    res.status(201).json(createdBridge)
  } catch (error) {
    console.error(error)
    res.status(500).send('Something went wrong')
  }
})

router.put('/:id', async (req, res) => {
  const { id } = req.params
  const updatedBridge: Bridge = req.body
  try {
    const result = await db.updateBridge(Number(id), updatedBridge)
    if (!result) {
      return res.status(404).send('Bridge not found')
    }
    res.status(200).json(result)
  } catch (error) {
    console.error(error)
    res.status(500).send('Something went wrong')
  }
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const result = await db.deleteBridge(Number(id))
    if (!result) {
      return res.status(404).send('Bridge not found')
    }
    res.status(204).send()
  } catch (error) {
    console.error(error)
    res.status(500).send('Something went wrong')
  }
})

export default router
