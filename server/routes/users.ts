import { Request, Response, Router } from 'express';
import { addUser, getUserByAuth0Sub, updateUser } from '../db/users';  // Assuming the correct path to your db functions
import { User, UserData } from '../../models/user';


const router = Router();

// Route to register a new user
router.post('/register', async (req: Request<{}, {}, User>, res: Response) => {
  try {
    // Extract user data from the request body
    const userData: User = req.body;

    // Check if the user already exists by their auth0_sub
    const existingUser = await getUserByAuth0Sub(userData.auth0Sub);
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
// Route to fetch user details by Auth0 sub
router.get('/:auth0_sub', async (req: Request, res: Response) => {
  const { auth0_sub } = req.params;
  console.log('Received auth0_sub:', auth0_sub);

  if (!auth0_sub) {
    console.error('auth0_sub is undefined or missing');
    return res.status(400).json({ message: 'auth0_sub is required' });
  }

  try {
    const user = await getUserByAuth0Sub(auth0_sub); // Fetch user by auth0_sub
    if (!user) {
      console.warn(`User with auth0_sub: ${auth0_sub} not found`);
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error(`Error fetching user with auth0_sub: ${auth0_sub}`, err);
    res.status(500).json({ message: 'Error fetching user' });
  }
});


router.post('/check', async (req, res) => {
  const { auth0Sub } = req.body
  try {
    const user = await getUserByAuth0Sub(auth0Sub)
    res.json({ exists: !!user }) // Return true if user exists, false otherwise
  } catch (err) {
    console.error('Error checking user:', err)
    res.status(500).json({ message: 'Error checking user' })
  }
})

router.patch('/update', async (req, res) => {
  const userData: UserData = req.body
  try {
    const user = await updateUser(userData)
    res.json(user)
  } catch (err) {
    console.error('Error updating user: ', err)
    res.status(400).json({message: 'Error updating user'})
  }
})


// Export the router
export default router;
