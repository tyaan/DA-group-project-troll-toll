export interface UserData {
  auth0Sub: string;
  name: string;
  lastName: string;
  email: string;
  picture: string;
  activeBridge?: number | null;
  totalToll?: number;
}

export interface User extends UserData {
  id: number
}