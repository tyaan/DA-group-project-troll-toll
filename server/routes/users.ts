import { Request, Response, Router } from 'express';
import { addUser, getUserByAuth0Sub } from '../db/users';  // Assuming the correct path to your db functions

// Define the User type
type User = {
  id?: number;
  auth0_sub: string;
  name: string;
  last_name: string;
  email: string;
  picture: string;
  active_bridge?: number;
  fav_bridges?: number;
  total_toll?: number;
};

const router = Router();

// Route to register a new user
router.post('/register', async (req: Request<{}, {}, User>, res: Response) => {
  try {
    // Extract user data from the request body
    const userData: User = req.body;

    // Check if the user already exists by their auth0_sub
    const existingUser = await getUserByAuth0Sub(userData.auth0_sub);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Add the new user to the database
    const newUser = await addUser(userData);

    // Return the newly created user
    res.status(201).json(newUser);
  } catch (err: unknown) {
    console.error(err);
    res.status(500).json({ message: 'Error registering user' });
  }
});

// Route to fetch user details by Auth0 sub (optional)
router.get('/:auth0_sub', async (req: Request, res: Response) => {
  try {
    const { auth0_sub } = req.params;
    const user = await getUserByAuth0Sub(auth0_sub);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (err: unknown) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching user' });
  }
});

// Export the router
export default router;
