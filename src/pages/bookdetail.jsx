import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router"
import { routes } from "../constants/constant";
import { GrLanguage } from "react-icons/gr";
import { BiMoney } from "react-icons/bi";


export default function Bookdetails(){
    const {id} = useParams()
    const[book,setBook]  =useState({})
    console.log("params " , id);
    
useEffect(()=>{
const fetch =async ()=>{
const singleBook = await axios.get(routes.signleBook+id)
// console.log(singleBook.data.data);
setBook(singleBook.data.data)


}

fetch()

},[])

console.log("book" , book);

    return(
        // w-full  md:w-full sm:w-full lg:w-3/6
<>
{book &&(
    <div className=" px-12 py-8 flex bg-zinc-900 gap-4  ">
    <div className="bg-zinc-800 p-4 rounded h-[80vh]  flex items-center w-3/6 justify-center">
        <img src={book.url} alt="/" className="h-[70vh]"  />
    </div>


    {/* flex flex-col */}
    <div className="p-4 rounded w-3/6 ">

    <h1 className="text-zinc-400 text-4xl font-semibold">{book.title}</h1>

    <p className="text-zinc-500 text-lg mt-1">By : {book.author}</p>

    <p className="mt-4 text-zinc-400">{book.description}</p>

    <div className=" mt-4 flex items-center gap-1 text-zinc-400">
    <GrLanguage className="me-3" />
    <p className=" text-zinc-400">
        {book.language} </p> 
    </div>

    <div className="mt-2 flex items-center gap-1 text-zinc-400">
<BiMoney className="me-3"/>
    <p className=" text-zinc-400">{book.price}</p>
    </div>

    </div>
</div>
)}
{!book && 
    <div className="flex items-center justify-center my-8">
    
      <Loader />
        </div> 
}



</>


    )
}