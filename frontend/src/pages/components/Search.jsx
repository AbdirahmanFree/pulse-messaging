import { Input } from "@/components/ui/input";
import { CiSearch } from "react-icons/ci";
import { useState, useEffect } from "react";
import axiosInstance from "@/utils/axiosInstance";
function Search(){
    const [number, setNumber] = useState("")
    const [numbers, setNumbers] = useState([])
    useEffect(()=>{
        async function getPhoneNumbers(){
            const userNumbersResponse = await axiosInstance.get(`/api/user/${number}`)
            const array = userNumbersResponse.data
            console.log(array.users)
            setNumbers(array.users)
            
        }
        getPhoneNumbers()
    },[number])

    return(
       <div className={`flex flex-col gap-2 mt-2 min-h-10 ${number ? 'max-h-25': 'max-h-10'} w-full rounded-b-lg borde-none px-3 overflow-y-scroll hide-scrollbar`}>
            <div className={`sticky top-0 z-10 bg-white flex items-center ${number ? 'border-b-1' : ''} `}>
                <CiSearch className="shrink-0" />
                <Input
                    type="number"
                    placeholder="Search..."
                    className="border-0 shadow-none ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none"
                    onChange={(e)=>{setNumber(e.target.value)}}
                    onWheel={(e) => e.target.blur()}
                />
            </div>
            {number  && (typeof numbers != "undefined") ? (
                <div className="flex flex-col px-3 max-h-20 ">
                    <ul className="flex flex-col px-5">
                       {numbers.map(user=>{
                            return (
                                <div id={user.id} className="flex flex-col hover:bg-gray-200 w-fit p-2 pr-16 rounded-2xl">
                                    <span >{user.phone_number}</span>
                                    <span className="opacity-60">{user.first_name} {user.last_name}</span>
                                </div>
                            )
                       })}
                    </ul>
                </div>):(<></>)}

        </div>
    )

}


export default Search