import request from 'superagent'
import { Bridge } from '../../models/bridge.ts'
import { Toll } from '../../models/toll.ts'

const bridgeURL = '/api/v1/bridges'

export async function getBridges(): Promise<Bridge[]> {
  const res = await request.get(bridgeURL)
  return res.body
}

export async function getBridge(id: number): Promise<Bridge>{
  const res = await request.get('/api/v1/bridges/' + id)
  return res.body
}

export async function getTollsByBridgeId(bridgeId: number): Promise<Toll[]>{
  const res = await request.get('/api/v1/toll/' + bridgeId)
  return res.body as Toll[]
}