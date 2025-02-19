import { Link } from "react-router";



export default function Bookcard({data}){

return(
<>
<Link to={`/bookdetails/${data._id}`}>
<div className="bg-zinc-800 rounded p-4 flex flex-col gap-4 ">
    <div className="bg-zinc-900 rounded flex items-center justify-center">
<img src={data.url} alt="bookimg" className="h-[40vh]" />




    </div>

<h2 className="font-bold text-lg text-zinc-300">{data.title.slice(0,30)}</h2>
<h3 className="text-zinc-200 font-semibold">Author : {data.author}</h3>
<h3 className="text-zinc-200 font-semibold">Price : {data.price} Pkr</h3>
{/* <span className="line-through">7000</span> */}
</div>



</Link>


</>



)

}