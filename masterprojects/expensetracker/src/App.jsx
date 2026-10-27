
// import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import Private from "./private/Private"
import UserDashboard from "./pages/UserDashboard"


function App() {


  return (
    <>
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Login/>}/>
              <Route path="/register" element={<Register/>}/>
              <Route path="/dash" element={<UserDashboard/>}/>
            {/* admin access */}

            <Route element={<Private/>}>
                <Route path="/admindash" element={<Dashboard/>}/>
            </Route>

          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App