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
  if (!userId) {
    return res.status(400).send({ error: 'User ID is required' });
  }
  try {
    const favorites = await getFavoriteBridges(Number(userId));
    res.status(200).json({ favorites });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Unable to retrieve favorite bridges' });
  }
});


router.delete('/favorites', async (req, res) => {
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
