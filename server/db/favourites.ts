import { FavouriteData } from '../../models/favourites.ts';
import db from './connection.ts'


export async function addFavoriteBridge(userId: FavouriteData, bridgeId: FavouriteData): Promise<void> {
 return await db('favourites').insert({ user_id: userId, bridge_id: bridgeId });
}

export async function getFavoriteBridges(userId: string): Promise<{ id: number; name: string }[]> {
  return await db('favourites')
    .join('bridges', 'favourites.bridge_id', 'bridges.id')
    .where('favourites.user_id', userId) // userId remains a string
    .select('bridges.id as id', 'bridges.name as name');
}


export async function removeFavoriteBridge(userId: string, bridgeId: number): Promise<void> {
  await db('favourites')
    .where({ user_id: userId, bridge_id: bridgeId })
    .del()
}
