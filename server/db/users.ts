import db from './connection'; 
import { User } from '../../models/user';
import { UserData } from '../../models/users';

export function getUserByAuth0Sub(auth0_sub: string): Promise<User | undefined> {
  return db('users').where({ auth0_sub }).first();
}

export async function addUser(user: User): Promise<User[]> {
  return db('users').insert(user).returning('*');
}

export async function getUserIdByAuth0Sub(auth0Sub: string): Promise<number | null> {
  const user = await db('users').select('id').where('auth0_sub', auth0Sub).first()
  return user?.id ?? null
}

export async function updateUser(userData: UserData): Promise<User> {
  return await db('users').where({"auth0_sub": userData.auth0_sub}).first()
    .update({
      "auth0_sub": userData.auth0_sub, 
      "name": userData.name, 
      "last_name": userData.last_name, 
      "email": userData.email, 
      "picture": userData.picture, 
      "active_bridge": userData.active_bridge, 
      "fav_bridges": userData.fav_bridges, 
      "total_toll": userData.total_toll
    }, ['*'])
}

export async function deleteUserByAuth0Sub(auth0Sub: string): Promise<void> {
  return await db('users').where({"auth0_sub": auth0Sub}).del()
}
