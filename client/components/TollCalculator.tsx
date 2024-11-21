import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { getTollsByBridgeId } from "../apis/toll"
import { useAuth0 } from "@auth0/auth0-react"
import { useState, useEffect } from "react"
import { ChangeEvent, FormEvent } from "react"
import { addToll } from "../apis/toll"
import { TollData } from "../../models/toll"

export default function TollCalculator(){

  const queryClient = useQueryClient()

  const { user, isAuthenticated } = useAuth0()
  
  const {id: bridgeId} = useParams()

  // GETTING AND DISPLAYING CURRENT TIME FOR TOLL FORM
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const updateSecond = () => setCurrentTime(new Date())
    const interval = setInterval(updateSecond, 1000)
    return () => clearInterval(interval)
  }, [currentTime])
  
  const [formState, setFormState] = useState({
    revenue: ''
  })

  // FORM STUFF TO ADD NEW TOLL
  const handleChange = (
    evt: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = evt.target
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const addTollMutation = useMutation({
    mutationFn: (toll: TollData) => addToll(toll),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['tolls']})
    }
  })

  const handleAddToll = (evt: FormEvent) => {
    evt.preventDefault()

    if(isNaN(Number(formState.revenue)) || Number(formState.revenue) == 0){
      alert('Revenue must be a number!')
      return
    }

    if(!user){
      console.log('Current user is undefined')
      return
    }
  
    addTollMutation.mutate({
      bridgeId: Number(bridgeId),
      userId: user.sub,
      userName: user.name,
      revenue: Number(formState.revenue),
      timestamp: currentTime
    })
  }

  // GETTING TOLL DATA
  const {data: tolls, isPending, isError} = useQuery({
    queryKey: ['tolls'], 
    queryFn: () => getTollsByBridgeId(Number(bridgeId))
  })

  // Pendings and loadings
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
      <h1 className="bridge-list-title">Tolls collected for this bridge</h1>
      <div className="bridge-items">
        <div className="top-row">
          <div className="icon-col"></div>
          <div className="name-col">Revenue</div>
          <div className="name-col">Troll</div>
          <div className="name-col">Timestamp</div>
        </div>

        {(isAuthenticated) && (
          <div className="row">
            <div className="icon-col"></div>

            <form>
              <div className="name-col">
                <input id="revenue" name="revenue" value={formState.revenue} onChange={handleChange} />
              </div>
            </form>
      
              <div className="name-col">
                {user?.name}
              </div>

              <div className="name-col">
                {renderTime(currentTime)}
              </div>  

            <form onSubmit={handleAddToll}>
              <button className="general-btn" type="submit">Log Toll</button>
            </form>
          </div>
        )
        }

        {tolls
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
        .map((toll) => (
            <div key={toll.id} className="row">
              <div className="icon-col"></div>
              <div className="name-col">{toll.revenue}</div>
              <div className="name-col">{toll.userName}</div>
              <div className="name-col">{renderTime(toll.timestamp)}</div>
            </div>
          )
        )}
      </div>
    </div>
  </div>
  )
}



