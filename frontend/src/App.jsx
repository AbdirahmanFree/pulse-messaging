import { Routes, BrowserRouter, Route } from "react-router"
import SignUp from "./pages/SignUp.jsx"
import LogIn from "./pages/LogIn.jsx"
import Home from "./pages/Home.jsx"
import ProtectedRoutes from "./utils/ProtectedRoutes.jsx"
import { UseUserAuth } from "./hooks/UseUserAuth.jsx"


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SignUp/>} path="/signup"/>
        <Route element={<LogIn/>} path="/login"/>
        <Route element={<ProtectedRoutes/>}>
          <Route element={<Home/>} path="/"/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
