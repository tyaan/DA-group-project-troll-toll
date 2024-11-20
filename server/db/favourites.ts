import { FavouriteData } from '../../models/favourites.ts';
import db from './connection.ts'


export async function addFavoriteBridge(userId: FavouriteData, bridgeId: FavouriteData): Promise<void> {
 return await db('favorites').insert({ user_id: userId, bridge_id: bridgeId });
}

export async function getFavoriteBridges(userId: number): Promise<{ id: number; name: string }[]> {
  return await db('favorites')
    .join('bridges', 'favorites.bridge_id', 'bridges.id')
    .where('favorites.user_id', userId)
    .select('bridges.id as id', 'bridges.name as name');
}