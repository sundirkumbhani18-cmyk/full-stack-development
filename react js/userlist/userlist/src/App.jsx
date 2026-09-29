import { Route, Routes } from "react-router-dom"
import UserList from "./pages/UserList"
import AddUser from "./pages/AddUser"
import EditUser from "./pages/EditUser"

function App() {
  
  return (
    <>
      <Routes>
          <Route path="/" element={<UserList/>}/>
          <Route path="/add" element={<AddUser/>}/>
          <Route path="/edit/:userid" element={<EditUser/>}/>
      </Routes>
    </>
  )
}

export default App
