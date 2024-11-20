import db from './connection';  // Assuming db is being exported as the default from 'connection'
import { User, UserData } from '../../models/user';

export async function getUserByAuth0Sub(auth0Sub: string): Promise<User | undefined> {
  try {
    console.log(`Attempting to fetch user with auth0_sub: ${auth0Sub}`);
    return await db('users').where({ auth0_sub: auth0Sub }).first();
  } catch (err) {
    console.error('Error fetching user:', err);
    throw err;
  }
}

export async function addUser(user: User): Promise<User[]> {
  return db('users').insert(user).returning('*');
}

export async function updateUser(userData: UserData): Promise<User> {
  return await db('users').where({"auth0_sub": userData.auth0Sub}).first()
    .update({
      "auth0_sub": userData.auth0Sub, 
      "name": userData.name, 
      "last_name": userData.lastName, 
      "email": userData.email, 
      "picture": userData.picture, 
      "activeBridge": userData.activeBridge, 
      "fav_bridges": userData.favBridges, 
      "total_toll": userData.totalToll
    }, ['*'])
}

export async function deleteUserByAuth0Sub(auth0Sub: string): Promise<void> {
  return await db('users').where({"auth0_sub": auth0Sub}).del()
}
