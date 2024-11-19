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
    <>
      <h1>Auckland Bridges🧌</h1>
      <ul>
        {bridges.map((br) => {
<<<<<<< HEAD
          // eslint-disable-next-line react/jsx-key
          return <li>{br.name}</li>
=======
          return <li key={br.name}>{br.name}</li>
>>>>>>> origin/gareth+sam
        })}
      </ul>
    </>
  )
}
