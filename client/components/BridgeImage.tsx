import { Bridge } from '../../models/bridge'

interface Props {
  bridge: Bridge
}

export function BridgeImage({ bridge }: Props) {
  const path = '/images/auckland-bridges/'
  const fileName =
    bridge.name.toLowerCase().replace(/\s/g, '-').replace(/ā/g, 'a') + '.png'
  return (
    <img className="bridge-image" src={path + fileName} alt={bridge.name} />
  )
}
