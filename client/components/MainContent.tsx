import { ReactNode } from "react";

export default function MainContent({children}: {children?: ReactNode}){
  return <div className="main-content flex flex-col items-center">
    {children}
  </div>
}