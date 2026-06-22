import { PhoneInput } from "@/components/reui/phone-input";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Search from "./Search";


function ChatList(){
    return (
        <div className="flex flex-col gap-2 w-1/3 h-screen border-r-1">
            <Search/>
            <div className="border w-full h-0.5"></div>
        </div>
    )
}
export default ChatList