import request from 'superagent'
import { Bridge } from '../../models/bridge.ts'

const bridgeURL = '/api/v1/bridges'

export async function getBridges(token?: string): Promise<Bridge[]> {
  const res = token ? await request.get(bridgeURL).set('Authorization', `Bearer ${token}`) : await request.get(bridgeURL)
  return res.body
}

export async function getBridge(id: number): Promise<Bridge>{
  const res = await request.get('/api/v1/bridges/' + id)
  return res.body
}