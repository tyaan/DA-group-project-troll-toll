export interface BridgeData {
  name: string
  location: string
  type: string
  yearBuilt: number
  lengthMeters: string
  lanes?: number | null
  addedByUser: string
}

export interface Bridge extends BridgeData {
  id: number
}