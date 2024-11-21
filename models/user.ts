export interface UserData {
  auth0Sub: string;
  name: string;
  lastName: string;
  email: string;
  picture: string;
  activeBridge?: number | null;
  favBridges?: number;
  totalToll?: number;
}

export interface User extends UserData {
  id: number
}