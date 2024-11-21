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
      .leftJoin('users', 'toll_analytics.user_id', 'users.auth0_sub')
      .select(
        "bridge_id as bridgeId", 
        "users.name as userName",
        "revenue", 
        "timestamp"
      ) as Toll[]
}

export async function getTollsByBridgeId(bridgeId: number): Promise<Toll[] | undefined> {
  return await db('toll_analytics')
    .leftJoin('users', 'toll_analytics.user_id', 'users.auth0_sub')
    .where("bridge_id", bridgeId)
    .select(
      "bridge_id as bridgeId", 
      "users.name as userName",
      "revenue", 
      "timestamp"
    ) as Toll[]
}

export async function getTollsByUserAuth0Sub(auth0Sub: string): Promise<Toll[] | undefined> {
  return await db('toll_analytics')
    .leftJoin('users', 'toll_analytics.user_id', 'users.auth0_sub')
    .where("auth0_sub", auth0Sub)
    .select(
      "bridge_id as bridgeId", 
      "users.name as userName",
      "revenue", 
      "timestamp"
    ) as Toll[]
}


