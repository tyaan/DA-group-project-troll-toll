import db from './connection';  // Assuming db is being exported as the default from 'connection'


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

function getUserByAuth0Sub(auth0_sub: string): Promise<User | undefined> {
  return db('users').where({ auth0_sub }).first();
}

function addUser(user: User): Promise<User[]> {
  return db('users').insert(user).returning('*');
}

export {
  getUserByAuth0Sub,
  addUser,
};
