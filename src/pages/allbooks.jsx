import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import { routes } from "../constants/constant"
import Bookcard from "../components/bookcard"
import Loader from "../components/loader"

export default function Allbooks(){
    const [Bookdata,setBookdata] = useState([])
    const[loader,setLoader] = useState(false)
    
    useEffect(()=>{
        setLoader(true)
        const fetch = async()=>{
    const response = await axios.get(routes.allBooks)
    setBookdata(response?.data?.data)
    setLoader(false)
    }
    fetch()
    
    
    },[])

    return(
<>

<div className="p-8 bg-zinc-900 min-h-screen ">

<h1 className=" text-amber-100 text-4xl text-center">


All Books</h1>

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


<br />
</div>
</>



    )
}