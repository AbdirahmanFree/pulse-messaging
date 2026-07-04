import { UseUserAuth } from "@/hooks/UseUserAuth"
import ChatList from "./components/ChatList"
import ChatWindow from "./components/ChatWindow"
import { ChatProvider } from "@/context/ChatContext"
function Home(){
    UseUserAuth()
    return(
        <div className="flex flex-row w-screen">
            <ChatList />
            <ChatWindow />            
        </div>
    )
}
export default Home