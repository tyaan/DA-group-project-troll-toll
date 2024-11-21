import request from 'superagent'
import { Toll, TollData } from "../../models/toll"

export async function getTollsByBridgeId(bridgeId: number): Promise<Toll[]>{
  const res = await request.get('/api/v1/toll/bridge/' + bridgeId)
  return res.body as Toll[]
}

export async function getTollsByUserId(auth0Sub: string): Promise<Toll[]>{
  const res = await request.get('/api/v1/toll/' + auth0Sub)
  return res.body as Toll[]
}

export async function addToll(tollData: TollData): Promise<Toll> {
  const res = await request.patch('/api/v1/toll/').send(tollData)
  return res.body as Toll
}