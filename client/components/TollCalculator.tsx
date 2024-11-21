import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { getTollsByBridgeId } from "../apis/bridge"
import { getUserById } from "../../server/db/users"

export default function TollCalculator(){
  
  const {id: bridgeId} = useParams()

  const {data: tolls, isPending, isError} = useQuery({
    queryKey: ['tolls'], 
    queryFn: () => getTollsByBridgeId(Number(bridgeId))
  })

  const {data: user, isPending, isError} = useQuery({
    queryKey: ['tolls'], 
    queryFn: () => getUserById(Number(bridgeId))
  })

  if(isPending) {
    return <p>Loading...</p>
  }

  if(isError) {
    return <p>No Trees...</p>
  }

  return (
  <div className="toll-calculator">
    <div className="bridge-list">
      <h1 className="bridge-list-title">Tolls collected for this bridge</h1>
      <div className="bridge-items">
        <div className="top-row">
          <div className="icon-col"></div>
          <div>Revenue</div>
          <div>Troll</div>
          <div>Time</div>
        </div>
        {tolls.map((toll) => {
          return (
            <div key={toll.id} className="row">
              <div className="icon-col"></div>
              <div>{toll.revenue}</div>
              <div>{toll.userId}</div>
              <div>{toll.timestamp}</div>
            </div>
          )
        })}
      </div>
    </div>
  </div>
  )
}