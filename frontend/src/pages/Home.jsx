import { UseUserAuth } from "@/hooks/UseUserAuth"
function Home(){
    UseUserAuth()
    return(
        <>Home page</>
    )
}
export default Home