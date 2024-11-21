import { Request, Response, Router } from 'express';
import { addUser, getUserByAuth0Sub, getUserById, updateUser } from '../db/users';  // Assuming the correct path to your db functions
import { User, UserData } from '../../models/user';
import db from '../db/connection'; 


const router = Router();

// Route to register a new user
router.post(  '/register',  async (req: Request<Record<string, never>, Record<string, never>, User>, res: Response) => {
    try {
      const userData: User = req.body;

      const existingUser = await getUserByAuth0Sub(userData.auth0_sub);
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      const newUser = await addUser(userData);

      res.status(201).json(newUser);
    } catch (err: unknown) {
      console.error(err);
      res.status(500).json({ message: 'Error registering user' });
    }
  }
);



  router.post('/check', async (req: Request, res: Response): Promise<Response> => {
    try {
      const { auth0Sub } = req.body;
  
      if (!auth0Sub) {
        return res.status(400).json({ message: 'auth0Sub is required' });
      }
  
      const user = await db('users').where({ auth0_sub: auth0Sub }).first();
  
      if (!user) {
        return res.status(404).json({ exists: false }); 
      }
  
      return res.status(200).json({
        exists: true, 
        user: {
          username: user.username,
          administrator: user.administrator,
          dev: user.dev
        }
      });
    } catch (error) {
      console.error('Error checking user:', error);
      return res.status(500).json({ message: 'Error checking user' });
    }
  });

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
