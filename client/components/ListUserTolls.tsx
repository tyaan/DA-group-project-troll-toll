import { useQuery} from "@tanstack/react-query"
import { getTollsByUserId } from "../apis/toll"
import { useAuth0 } from "@auth0/auth0-react"

export default function ListUserTolls(){

  const { user } = useAuth0()
  
  // GETTING TOLL DATA
  const {data: tolls, isPending, isError} = useQuery({
    queryKey: ['tolls'], 
    queryFn: () => getTollsByUserId(String(user?.sub))
  })

  if(isPending) {
    return <p>Loading...</p>
  }

  if(isError) {
    return <p>No Trees...</p>
  }
  
  const renderTime = (timestamp: Date): JSX.Element => {
    if(!timestamp){
      return (
        <div>
          NA
        </div>
      )
    }
    const date = new Date(timestamp)
    return (
      <div>
        {`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`}
        <br />
        {`${date.getHours()}:${String(date.getMinutes() + 1).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`}
      </div>
    )
  }

  return (
  <div className="toll-calculator">
    <div className="bridge-list">
      <h1 className="bridge-list-title">My Tolls</h1>
      <div className="bridge-items">

        <div className="row">
          <div className="icon-col"></div>
          <div className="total-rev-col">Total Revenue: {tolls.reduce((a, b) => a + b.revenue, 0)}</div>
        </div>

        <div className="top-row">
          <div className="icon-col"></div>
          <div className="name-col">Revenue</div>
          <div className="name-col">Bridge</div>
          <div className="name-col">Timestamp</div>
        </div>


        {tolls
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
        .map((toll) => (
            <div key={toll.id} className="row">
              <div className="icon-col"></div>
              <div className="name-col">{toll.revenue}</div>
              <div className="name-col">{toll.bridgeName}</div>
              <div className="name-col">{renderTime(toll.timestamp)}</div>
            </div>
          )
        )}
      </div>
    </div>
  </div>
  )
}



