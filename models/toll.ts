export interface TollData {
  bridgeId: number, 
  userId: string, // auth0sub
  userName: string,
  revenue: number, 
  timestamp: Date
}

export interface Toll extends TollData {
  id: number
}