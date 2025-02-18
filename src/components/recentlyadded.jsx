import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import { routes } from "../constants/constant"
import Bookcard from "./bookcard"




export default function Recentlyadded(){
    const [Bookdata,setBookdata] = useState([])
    
useEffect(()=>{

    const fetch = async()=>{
const response = await axios.get(routes.Allbooks)
setBookdata(response?.data?.data)
}
fetch()


},[])

console.log("bookds" , Bookdata);

return(
<>
<br />
<h1 className="flex text-amber-100 text-4xl place-items-center">


Recently Added</h1>

{/* books card cols etc place-items-center   */}
<div className="my-8 grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 text-center ">
{Bookdata.map((items,i)=>(
<div>

<Bookcard key={i} data={items} />
</div>

))}


</div>




</>



)



}
