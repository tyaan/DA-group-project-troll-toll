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
   return await db('toll_analytics')
      .leftJoin('users', 'toll_analytics.user_id', 'users.id')
      .select(
        "bridge_id as bridgeId", 
        "user_id as userId", 
        "users.name as userName",
        "revenue", 
        "timestamp"
      ) as Toll[]
}

export async function getTollsByBridgeId(bridgeId: number): Promise<Toll[] | undefined> {
  return await db('toll_analytics')
    .leftJoin('users', 'toll_analytics.user_id', 'users.id')
    .where("bridge_id", bridgeId)
    .select(
      "bridge_id as bridgeId", 
      "user_id as userId", 
      "users.name as userName",
      "revenue", 
      "timestamp"
    ) as Toll[]
}

export async function getTollsByUserId(userId: number): Promise<Toll[] | undefined> {
  return await db('toll_analytics')
    .leftJoin('users', 'toll_analytics.user_id', 'users.id')
    .where("user_id", userId)
    .select(
      "bridge_id as bridgeId", 
      "user_id as userId", 
      "users.name as userName",
      "revenue", 
      "timestamp"
    ) as Toll[]
}


