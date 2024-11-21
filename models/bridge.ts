export interface BridgeData {
  name: string
  location: string
  type: string
  yearBuilt: number
  lengthMeters: string
  lanes?: number | null
  activeTroll: string | null,
  activeTrollSubId: string | null,
  isFavourited: boolean
}

export interface Bridge extends BridgeData {
  id: number
}
