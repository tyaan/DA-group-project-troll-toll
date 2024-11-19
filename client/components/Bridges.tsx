import { getBridges } from '../apis/bridge.ts'
import { useQuery } from '@tanstack/react-query'

export default function Bridges() {
  const {
    data: bridges,
    error,
    isLoading,
  } = useQuery({ queryKey: ['bridges'], queryFn: getBridges })

  if (error) {
    return <p>Your bridges are gone! What a massive error</p>
  }
  if (!bridges || isLoading) {
    return <p>Fetching bridges from auckland...</p>
  }

  return (
    <div className='bridge-list flex flex-col gap-4'>
      <h1 className='text-2xl font-bold'>Troll friendly Auckland Bridges</h1>
      <div className='bridge-items'>
        <div className='top-row row text-xl font-bold'>
          <div className='icon-col'></div>
          <div className='name-col'>Bridge Name</div>
          <div className='status-col'>Status</div>
          <div className='owner-col'>Troll Owner</div>
          <div className='actions-col'>Actions</div>
        </div>
        {bridges.map((br) => {
          return <div key={br.id} className='row text-xl'>
            <div className='icon-col'></div>
            <div className='name-col'>{br.name}</div>
            <div className='status-col'>Unknown</div>
            <div className='owner-col'>Unknown</div>
            <div className='actions-col'>Unknown</div>
          </div> 
        })}
      </div>
      
    </div>
  )
}
