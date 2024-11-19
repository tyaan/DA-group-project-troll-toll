import { createRoutesFromElements, Route } from 'react-router-dom'
import Layout from './components/Layout.tsx'
import Main from './components/Main.tsx'
import SingleBridge from './components/SingleBridge.tsx'
export default createRoutesFromElements(<Route element={<Layout />}>
  <Route path='/' element={<Main/>}/>
  <Route path='bridges'>
    <Route path=':id' element={<SingleBridge/>}>
    </Route>
  </Route>
</Route>)
