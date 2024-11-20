import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { getTollsByBridgeId } from "../apis/bridge"

export default function TollCalculator(){
  
  const {id: bridgeId} = useParams()

  const {data: tolls, isPending, isError} = useQuery({
    queryKey: ['tolls'], 
    queryFn: () => getTollsByBridgeId(Number(bridgeId))
  })

  if(isPending) {
    return <p>Loading...</p>
  }

  if(isError) {
    return <p>No Trees...</p>
  }

  return <div className="toll-calculator">
    <h2>Tolls collected for this bridge</h2>
    <ul>
      {tolls.map((toll) => (
        <li key={toll.id}>
          {toll.revenue}
        </li>
      ))}
    </ul>
  </div>
}