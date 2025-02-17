import Hero from "../components/hero";
import Recentlyadded from "../components/recentlyadded";



export default function Home (){
    return(
<>
<div className="text-white bg-zinc-900 px-10 py-8 pt-24">

<Hero/>

<Recentlyadded/>
</div>

</>



    )
}