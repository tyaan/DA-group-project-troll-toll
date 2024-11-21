export interface UserData {
  auth0Sub: string;
  name: string;
  lastName: string;
  email: string;
  picture: string;
<<<<<<< HEAD
  activeBridge?: number | null;
  favBridges?: number;
=======
  activeBridge?: number;
>>>>>>> dev
  totalToll?: number;
}

export interface User extends UserData {
  id: number
}