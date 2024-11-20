export interface BridgeData {
  name: string
  location: string
  type: string
  yearBuilt: number
  lengthMeters: string
  lanes?: number | null
  activeTroll: string | null
}

export interface Bridge extends BridgeData {
  addedByUser: any
  id: number
}
