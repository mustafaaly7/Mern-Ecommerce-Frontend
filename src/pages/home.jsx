import { useEffect } from "react";
import Hero from "../components/hero";
import Recentlyadded from "../components/recentlyadded";
import axios from "axios";
import { routes } from "../constants/constant";



export default function Home (){
//     useEffect(()=>{
// axios.get(routes.Allbooks).then((res)=>console.log("res" ,res?.data?.data)
// ).catch((err)=>console.log("error" , err)
// )


//     },[])


    return(
<>
<div className="text-white bg-zinc-900 px-10 py-8 pt-24">

<Hero/>

<Recentlyadded/>
</div>

</>



    )
}