export interface TollData {
  bridgeId: number, 
  userId: number,
  userName: string,
  revenue: number, 
  timestamp: string
}

export interface Toll extends TollData {
  id: number
}