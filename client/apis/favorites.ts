import request from 'superagent'

const favoritesURL = '/api/v1/favorites'

export interface FavoriteBridge {
  id: number
  name: string
}

// Add a bridge to the user's favorites
export async function addFavorite(userId: number, bridgeId: number): Promise<void> {
  await request.post(favoritesURL).send({ userId, bridgeId })
}

// Remove a bridge from the user's favorites
export async function removeFavorite(userId: number, bridgeId: number): Promise<void> {
  await request.delete(favoritesURL).send({ userId, bridgeId })
}


// Get a user's favorite bridges
export async function getFavorites(userId: number): Promise<FavoriteBridge[]> {
  const res = await request.get(favoritesURL).query({ userId })
  return res.body.favorites
}
