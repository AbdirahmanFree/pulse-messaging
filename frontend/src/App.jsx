import { Routes, BrowserRouter, Route } from "react-router"
import SignUp from "./pages/SignUp.jsx"


function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SignUp/>} path="/signup"/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
