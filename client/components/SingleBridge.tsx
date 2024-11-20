import { Link, useParams } from 'react-router-dom'
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

  // Function to add the bridge to favorites. //
  const addToFavorites = async () => {
    try {
      const userId = 1 // Replace this with the actual logged-in user's ID
      const response = await fetch('/api/favorites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, bridgeId: bridge.id }), // Send the bridgeId and userId in the body
      })

      if (!response.ok) {
        throw new Error('Failed to add bridge to favorites')
      }

      alert('Bridge added to your favorites!')
    } catch (error) {
      console.error('Error adding to favorites:', error)
      alert('Failed to add bridge to favorites')
    }
  }

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
            <div className="navigation-button">
              <button className="Add-favorite" onClick={addToFavorites}>
                ADD TO FAVOURITE
              </button>
            </div>
          </div>
        </div>
        <div className="header-right">
          <BridgeImage bridge={bridge} />
        </div>
      </Header>
      <MainContent>
        <TollCalculator />
        {/* Add the "Go Back" button */}
        <div className="navigation-button">
          <Link to="/" className="home-button">
            RETURN HOME
          </Link>
        </div>
      </MainContent>
    </main>
  )
}
