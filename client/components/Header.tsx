import { ReactNode } from "react"

interface Props{
  children: ReactNode
}

export default function Header({children}: Props){
  return <header className="flex items-center justify-center gap-40">
    {children}
  </header>
}