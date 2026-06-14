import { Routes, BrowserRouter, Route } from "react-router"
import SignUp from "./pages/SignUp.jsx"
import LogIn from "./pages/LogIn.jsx"


function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SignUp/>} path="/signup"/>
        <Route element={<LogIn/>} path="/login"/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
