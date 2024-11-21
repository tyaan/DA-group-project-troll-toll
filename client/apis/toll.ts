import request from 'superagent'
import { Toll } from "../../models/toll"

export async function getTollsByBridgeId(bridgeId: number): Promise<Toll[]>{
  const res = await request.get('/api/v1/toll/bridge/' + bridgeId)
  return res.body as Toll[]
}