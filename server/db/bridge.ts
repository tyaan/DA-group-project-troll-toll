import db from './connection.ts'
import { Bridge, BridgeData } from '../../models/bridge.ts'

export async function getBridges(): Promise<Bridge[]> {
  return await db('bridges').select(
    'id',
    'name',
    'location',
    'type',
    'year_built as yearBuilt',
    'length_meters as lengthMeters',
    'lanes',
    'added_by_user as addedByUser',
  )
}

export async function getBridgeById(id: number): Promise<Bridge | null> {
  const bridge = await db('bridges')
    .where({ id })
    .first()
    .select(
      'id',
      'name',
      'location',
      'type',
      'year_built as yearBuilt',
      'length_meters as lengthMeters',
      'lanes',
      'added_by_user as addedByUser',
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
