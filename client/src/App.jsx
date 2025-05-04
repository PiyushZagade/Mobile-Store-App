import React, { createContext, useState } from "react"
import Register from "./Page/Register"
import Login from "./Page/Login"
import Mobile from "./Page/Mobile"
import { Route, Routes } from "react-router-dom"
import { ToastContainer} from 'react-toastify';
import Orders from "./Page/Orders"
import AddMobile from "./Page/AddMobile"
import DisplayMobile from "./Page/DisplayMobile"
import UpdateMobile from "./Page/UpdateMobile"

export const AuthContext = createContext()
export const mobContext = createContext()

export function App() {

  const [user, setUser] = useState(null)
  const [mobId, setMobId] = useState(null)

  return (
    <>
      <AuthContext.Provider value={{ user, setUser }}>
        <mobContext.Provider value={{ mobId, setMobId }}>
          <Routes>
            <Route path='/reg' element={<Register />}></Route>
            <Route path='/log' element={<Login />}></Route>
            <Route path='/' element={<Mobile />}></Route>
            <Route path='/orders' element={<Orders />}></Route>
            <Route path='/add' element={<AddMobile />}></Route>
            <Route path='/upd' element={<UpdateMobile />}></Route>
            <Route path='/show' element={<DisplayMobile />}></Route>
          </Routes>
        </mobContext.Provider>
      </AuthContext.Provider>
      <ToastContainer />
    </>
  )
}
export default App