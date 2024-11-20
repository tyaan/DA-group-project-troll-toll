export interface BridgeData {
  name: string
  location: string
  type: string
  yearBuilt: number
  lengthMeters: string
  lanes?: number | null
  activeTrollId: number | null
}

export interface Bridge extends BridgeData {
  id: number
}
