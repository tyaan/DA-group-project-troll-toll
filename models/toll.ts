export interface TollData {
  bridgeId: number, 
  userId: number
  revenue: number, 
  timestamp: string
}

export interface Toll extends TollData {
  id: number
}