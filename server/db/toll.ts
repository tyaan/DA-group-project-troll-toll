import db from './connection';  // Assuming db is being exported as the default from 'connection'
import { Toll, TollData } from '../../models/toll';

export async function addToll(tollData: TollData): Promise<Toll | undefined> {
  return await db('toll_analytics').insert(
    {
      "bridge_id": tollData.bridgeId, 
      "user_id": tollData.userId, 
      "revenue": tollData.revenue, 
      "timestamp": tollData.timestamp
    }, ['*']
  ) as Toll
}

export async function getTolls(): Promise<Toll[] | undefined> {
   return await db('toll_analytics').select(
     "bridge_id as bridgeId", 
     "user_id as userId", 
     "revenue", 
     "timestamp"
   ) as Toll[]
}

export async function getTollsByBridgeId(bridgeId: number): Promise<Toll[] | undefined> {
  return await db('toll_analytics').where("bridge_id", bridgeId)
    .select(
      "bridge_id as bridgeId", 
      "user_id as userId", 
      "revenue", 
      "timestamp"
    ) as Toll[]
}

export async function getTollsByUserId(userId: number): Promise<Toll[] | undefined> {
  return await db('toll_analytics').where("user_id", userId)
    .select(
      "bridge_id as bridgeId", 
      "user_id as userId", 
      "revenue", 
      "timestamp"
    ) as Toll[]
}


