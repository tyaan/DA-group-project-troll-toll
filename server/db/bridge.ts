import db from './connection.ts'
import { Bridge, BridgeData } from '../../models/bridge.ts'

export async function getBridges(): Promise<Bridge[]> {
  return await db('bridges')
    .leftJoin('users', 'users.active_bridge', 'bridges.id')
    .select(
      'bridges.id as id',
      'bridges.name as name',
      'bridges.location as location',
      'bridges.type as type',
      'bridges.year_built as yearBuilt',
      'bridges.length_meters as lengthMeters',
      'bridges.lanes as lanes',
      'users.name as activeTroll'
    )
}

export async function getBridgeById(id: number): Promise<Bridge | null> {
  const bridge = await db('bridges')
    .leftJoin('users', 'users.active_bridge', 'bridges.id')
    .where('bridges.id', id)
    .first()
    .select(
      'bridges.id as id',
      'bridges.name as name',
      'bridges.location as location',
      'bridges.type as type',
      'bridges.year_built as yearBuilt',
      'bridges.length_meters as lengthMeters',
      'bridges.lanes as lanes',
      'users.name as activeTroll',
    )

  return bridge || null
}

export async function addBridge(bridge: BridgeData): Promise<Bridge> {
  const [newBridge] = await db('bridges').insert(bridge).returning('*')
  return newBridge
}

export async function updateBridge(
  id: number,
  bridge: Partial<Bridge>,
): Promise<Bridge | null> {
  const [updatedBridge] = await db('bridges')
    .where({ id })
    .update(bridge)
    .returning('*')
  return updatedBridge || null
}

export async function deleteBridge(id: number): Promise<number> {
  return db('bridges').where({ id }).delete()
}
