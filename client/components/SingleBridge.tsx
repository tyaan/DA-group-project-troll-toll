import { useParams } from 'react-router-dom'
import { getBridge } from '../apis/bridge'
import Header from './Header'
import MainContent from './MainContent'
import { useQuery } from '@tanstack/react-query'
import TollCalculator from './TollCalculator'
import { BridgeImage } from './BridgeImage'

export default function SingleBridge() {
  const params = useParams()

  const {
    data: bridge,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['bridge', params.id],
    queryFn: () => getBridge(Number(params.id)),
  })

  if (error) {
    return <p>The bridge isn&#39;t loading! What&#39;s going on???</p>
  }
  if (!bridge || isLoading) {
    return <p>Fetching bridge from Auckland...</p>
  }

  /*
  {
    "id": 9,
    "name": "Tāmaki Bridge",
    "location": "Tāmaki",
    "type": "Bridge type",
    "yearBuilt": 2015,
    "lengthMeters": 90,
    "lanes": null,
    "addedByUser": null
  }
  */

  return (
    <main>
      <Header>
        <div className="header-left flex flex-col gap-3">
          <h2 className="header-title">{bridge.name}</h2>
          <div>
            <div className="list-text">
              <p className="font-bold">Location: </p>
              <p>{bridge.location}</p>
            </div>
            <div className="list-text">
              <p className="font-bold">Bridge Type: </p>
              <p>{bridge.type}</p>
            </div>
            <div className="list-text">
              <p className="font-bold">Year Built: </p>
              <p>{bridge.yearBuilt}</p>
            </div>
            <div className="list-text">
              <p className="font-bold">Length: </p>
              <p>{bridge.lengthMeters}</p>
            </div>
            <div className="list-text">
              <p className="font-bold">Car Lanes: </p>
              <p>{bridge.lanes ?? 'N/A'}</p>
            </div>
            <div className="list-text">
              <p className="font-bold">Troll Operator: </p>
              {
                <p>
                  {bridge.addedByUser ?? (
                    <span style={{ fontStyle: 'italic' }}>None</span>
                  )}
                </p>
              }
            </div>
          </div>
        </div>
        <div className="header-right">
          <BridgeImage bridge={bridge} />
        </div>
      </Header>
      <MainContent>
        <TollCalculator />
      </MainContent>
    </main>
  )
}
