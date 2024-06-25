import { useEffect, useState } from "react"
import Dashboard from "./Pages/Dashboard/dashboard"
import Login from "./Pages/Login/login"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Registration from "./Pages/registration/registration"
import Dashboard2 from "./Pages/Dashboard/dashboard2"

let App = () => {

  return (
    <> 
      <BrowserRouter>
        <Routes>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/Registration" element={<Registration/>}></Route>
          <Route exact path="/Dashboard" element={<Dashboard/>}></Route>
          <Route exact path="/Dashboard2" element={<Dashboard2/>}></Route>

        </Routes>
      </BrowserRouter>


    </>
  )
}

export default App