import express from 'express';
import { addFavoriteBridge, getFavoriteBridges, removeFavoriteBridge } from '../db/favourites.ts';

const router = express.Router();

// Add a bridge to the user's favorites
router.post('/', async (req, res) => {
  const { userId, bridgeId } = req.body;
  try {
    await addFavoriteBridge(userId, bridgeId);
    res.status(200).send({ success: 'Bridge added to favorites successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Unable to add bridge to favorites' });
  }
});

// Get a user's favorite bridges
router.get('/', async (req, res) => {
  const userId = req.query.userId;

  // Validate userId presence
  if (!userId || typeof userId !== 'string') {
    return res.status(400).send({ error: 'Invalid or missing user ID' });
  }

  try {
    const favorites = await getFavoriteBridges(userId);

    if (favorites.length === 0) {
      return res.status(200).json({ favorites: [], message: 'No favorite bridges found' });
    }

    res.status(200).json({ favorites });
  } catch (err) {
    console.error('Error fetching favorite bridges:', err.message);
    res.status(500).send({ error: 'Unable to retrieve favorite bridges' });
  }
});



router.delete('/', async (req, res) => {
  const { userId, bridgeId } = req.body
  try {
    await removeFavoriteBridge(userId, bridgeId)
    res.status(200).send({ success: 'Bridge removed from favorites successfully' })
  } catch (err) {
    console.error(err)
    res.status(500).send({ error: 'Unable to remove bridge from favorites' })
  }
})

export default router;
