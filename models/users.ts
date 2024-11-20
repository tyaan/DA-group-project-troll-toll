export type User = {
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


  export type UserData = {
    auth0_sub: string;
    name: string;
    last_name: string;
    email: string;
    picture: string;
    active_bridge?: number;
    fav_bridges?: number;
    total_toll?: number;
  };
  

