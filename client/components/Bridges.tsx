import { Link } from 'react-router-dom'
import { getBridges } from '../apis/bridge.ts'
import { useQuery } from '@tanstack/react-query'
import { useAuth0 } from '@auth0/auth0-react'

export default function Bridges() {

  const auth = useAuth0()

  const {
    data: bridges,
    error,
    isLoading,
  } = useQuery({ queryKey: ['bridges'], queryFn: () => auth.getAccessTokenSilently().then(token => getBridges(token)).catch(() => getBridges()) })

  

  if (error) {
    return <p>Your bridges are gone! What a massive error</p>
  }
  if (!bridges || isLoading) {
    return <p>Fetching bridges from Auckland...</p>
  }

  const petrolBridgeClick = () =>{
    console.error("Not implemented")
  }

  const favouritesClick = () =>{
    console.error("Not implemented")
  }

  return (
    <div className="bridge-list">
      <h1 className="bridge-list-title">Troll friendly Auckland Bridges</h1>
      <div className="bridge-items">
        <div className="top-row">
          <div className="bridge-col icon-col"></div>
          <div className="bridge-col name-col">Bridge Name</div>
          <div className="bridge-col status-col">Status</div>
          <div className="bridge-col owner-col">Troll Owner</div>
          <div className="bridge-col actions-col">Actions</div>
        </div>
        {bridges.map((br) => {

          const shouldShowPetrol = auth.isAuthenticated && (br.activeTroll == null || auth.user?.sub === br.activeTrollSubId)
          const shouldShowFavourite = auth.isAuthenticated
          console.log(auth.user?.sub)

          const patrolText = auth.user?.sub != br.activeTrollSubId ? 'Patrol this bridge' : 'Stop Patrolling'
          const favText = br.isFavourited ? 'Unfavourite' : 'Add to favourites'

          return (
            <div key={br.id} className="row">
              <div className="bridge-col icon-col"></div>
              <div className="bridge-col name-col">
                <Link to={'/bridges/' + br.id}>{br.name}</Link>
              </div>
              <div className="bridge-col status-col">{br.activeTroll == null ? 'Inactive' : 'Active'}</div>
              <div className="bridge-col owner-col">{br.activeTroll ?? 'No Troll Operator'}</div>
              <div className="bridge-col actions-col flex justify-center gap-3 items-center">
                <button onClick={petrolBridgeClick} className={'action-button' + (shouldShowPetrol ? '' : ' opacity-0 pointer-events-none')}><p>{patrolText}</p></button>
                <button onClick={favouritesClick} className={'action-button' + (shouldShowFavourite ? '' : ' opacity-0 pointer-events-none')}><p>{favText}</p></button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
