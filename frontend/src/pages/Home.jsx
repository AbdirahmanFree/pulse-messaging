import { UseUserAuth } from "@/hooks/UseUserAuth"
import ChatList from "./components/ChatList"
import ChatWindow from "./components/ChatWindow"
function Home(){
    UseUserAuth()
    return(
        <div className="flex flex-row w-screen">
            <ChatList className=""/>
            <ChatWindow />
        </div>
    )
}
export default Home