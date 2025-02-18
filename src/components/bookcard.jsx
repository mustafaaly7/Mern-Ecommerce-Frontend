import { Link } from "react-router";



export default function Bookcard({data}){

return(
<>
<Link>
<div className="bg-zinc-800 rounded p-4 ">
    <div className="bg-zinc-900 rounded flex items-center justify-center">
<img src={data.url} alt="bookimg" className="h-[40vh]" />

    </div>
</div>



</Link>


</>



)

}