import request from 'superagent'
import { User, UserData } from '../../models/users.ts'
import { UserData as UserData2 } from '../../models/user.ts';

const userURL = '/api/v1/users'

interface ErrorWithStatus extends Error {
  status?: number;
}


export async function getUser(auth0Sub: string): Promise<User | null> {
  try {
    const res = await request.get(`${userURL}/${auth0Sub}`);
    return res.body;
  } catch (err: unknown) {
    if ((err as ErrorWithStatus).status === 404) {
      return null;
    }
    console.error('Error fetching user:', err);
    throw err;
  }
}


export async function checkUser(auth0_sub: string): Promise<boolean> {
  try {
    const res = await fetch('http://localhost:3000/api/v1/users/check', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ auth0_sub }), 
    });

    if (res.ok) {
      const data = await res.json();
      return data.exists; 
    } else {
      throw new Error('Failed to check user existence');
    }
  } catch (err) {
    console.error('Error checking user existence:', err);
    return false; 
  }
}


export async function registerUser(userData: UserData): Promise<User> {
  try {
    const response = await fetch('http://localhost:3000/api/v1/users/register', {
      method: 'POST',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('Error registering user');
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error('Error registering user:', err);
    throw err;
  }
}


export async function updateUser(userData: UserData): Promise<User> {
  try {
    const res = await request.patch(`${userURL}/update`).send(userData)
    return res.body
  } catch (err: unknown) {
    console.error('Error updating user:', err)
    throw err
  }
}

export async function updateUserV2(userData: UserData2): Promise<User> {
  try {
    const res = await request.patch(`${userURL}/update`).send(userData)
    return res.body
  } catch (err: unknown) {
    console.error('Error updating user:', err)
    throw err
  }
}


export async function deleteUser(auth0Sub: string): Promise<void> {
  try {
    await request.delete(`${userURL}/${auth0Sub}`)
  } catch (err: unknown) {
    console.error('Error deleting user:', err)
    throw err
  }
}


