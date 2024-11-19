import { createRoutesFromElements, Route } from 'react-router-dom'
import Layout from './components/Layout.tsx'
import Main from './components/Main.tsx'
export default createRoutesFromElements(<Route element={<Layout />}>
  <Route path='/' element={<Main/>}/>
</Route>)
