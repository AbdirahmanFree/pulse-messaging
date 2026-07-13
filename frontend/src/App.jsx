import { Routes, BrowserRouter, Route } from "react-router"
import SignUp from "./pages/SignUp.jsx"
import LogIn from "./pages/LogIn.jsx"
import Home from "./pages/Home.jsx"
import ProtectedRoutes from "./utils/ProtectedRoutes.jsx"
import Chat from "./pages/Chat.jsx"
import { SocketProvider } from "./context/SocketContext.jsx"


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SignUp/>} path="/signup"/>
        <Route element={<LogIn/>} path="/login"/>
        <Route element={
          <SocketProvider>
            <ProtectedRoutes/>
          </SocketProvider>
          }>   
              <Route element={<Home/>} path="/"/>
              <Route element={<Chat/>} path="/chat/:chatId"/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
