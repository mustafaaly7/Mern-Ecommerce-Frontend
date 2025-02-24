import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import { routes } from "../constants/constant"
import Bookcard from "./bookcard"
import Loader from "./loader"




export default function Recentlyadded(){
    const [Bookdata,setBookdata] = useState([])
    const[loader,setLoader] = useState(false)

    
useEffect(()=>{

        setLoader(true)
    const fetch = async()=>{
const response = await axios.get(routes.recentBooks)
setBookdata(response?.data?.data)
setLoader(false)
}
fetch()


},[])


return(
<>
<br />
<h1 className="flex text-amber-100 text-4xl place-items-center">


Recently Added</h1>

{loader?( <div className="flex items-center justify-center my-8 min-h-screen">

  <Loader />
    </div>):(
    
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
