import { Link, useParams } from 'react-router-dom'
import { getBridge } from '../apis/bridge'
import Header from './Header'
import MainContent from './MainContent'
import { useQuery } from '@tanstack/react-query'
import TollCalculator from './TollCalculator'
import { BridgeImage } from './BridgeImage'
import { useAuth0 } from '@auth0/auth0-react'
import { addFavorite, removeFavorite, getFavorites } from '../apis/favorites'
import { useState, useEffect } from 'react'

export default function SingleBridge() {
  const params = useParams()
  const { user } = useAuth0()

  const {
    data: bridge,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['bridge', params.id],
    queryFn: () => getBridge(Number(params.id)),
  })

  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    if (user) {
      const checkIfFavorite = async () => {
        const userId = user.sub
        const favorites = await getFavorites(userId)
        const isInFavorites = favorites.some((fav) => fav.id === bridge.id)
        setIsFavorite(isInFavorites)
      }

      if (bridge) {
        checkIfFavorite()
      }
    }
  }, [user, bridge])

  const handleFavoriteToggle = async () => {
    try {
      if (!user) {
        alert('You must be logged in to add a favorite!')
        return
      }

      const userId = user.sub // This is the Auth0 user ID

      if (isFavorite) {
        // Remove from favorites
        await removeFavorite(userId, bridge.id)
        setIsFavorite(false)
        alert('Bridge removed from your favorites!')
      } else {
        // Add to favorites
        await addFavorite(userId, bridge.id)
        setIsFavorite(true)
        alert('Bridge added to your favorites!')
      }
    } catch (error) {
      console.error('Error toggling favorite:', error)
      alert('Failed to update favorite status')
    }
  }

  if (error) {
    return <p>The bridge isn&#39;t loading! What&#39;s going on???</p>
  }
  if (!bridge || isLoading) {
    return <p>Fetching bridge from Auckland...</p>
  }

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
              <button className="general-btn" onClick={handleFavoriteToggle}>
                {isFavorite ? 'REMOVE FROM FAVORITE' : 'ADD TO FAVORITE'}
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
      </MainContent>
    </main>
  )
}
