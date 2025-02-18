import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import { routes } from "../constants/constant"
import Bookcard from "./bookcard"
import Loader from "./loader"




export default function Recentlyadded(){
    const [Bookdata,setBookdata] = useState([])
    
useEffect(()=>{

    const fetch = async()=>{
const response = await axios.get(routes.recentBooks)
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
{!Bookdata ? (
    <div className="flex items-center justify-center my-8">

  <Loader />
    </div> // If Bookdata is not available, show the loader
) : (

    
<div className="my-8 grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 text-center ">
{Bookdata.map((items,i)=>(
    <div key={i}>

<Bookcard  data={items} />
</div>
))}
</div>

)}







</>



)



}
