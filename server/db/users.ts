import db from './connection';  // Assuming db is being exported as the default from 'connection'
import { User, UserData } from '../../models/user';

export async function getUserById(id: number): Promise<User | undefined> {
  return await db('users')
    .where('id', id).first()
    .select(
      "id",
      "auth0_sub as auth0Sub",
      "name", 
      "last_name as lastName", 
      "email", 
      "picture", 
      "active_bridge as activeBridge", 
      "total_toll as totalToll"
    )
}

export function getUserByAuth0Sub(auth0_sub: string): Promise<User | undefined> {
  return db('users').where({ auth0_sub }).first();
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
      "total_toll": userData.totalToll
    }, ['*'])
}

export async function deleteUserByAuth0Sub(auth0Sub: string): Promise<void> {
  return await db('users').where({"auth0_sub": auth0Sub}).del()
}
