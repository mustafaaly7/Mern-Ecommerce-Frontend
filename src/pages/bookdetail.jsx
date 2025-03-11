import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router"
import { routes } from "../constants/constant";
import { GrLanguage } from "react-icons/gr";
import Loader from "../components/loader";
import { FaCartShopping } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";


export default function Bookdetails() {
    const { id } = useParams()
    const [book, setBook] = useState({})
    const [loader, setLoader] = useState(false)

    useEffect(() => {
        setLoader(true)
        const fetch = async () => {
            const singleBook = await axios.get(routes.signleBook + id)
            // console.log(singleBook.data.data);
            setBook(singleBook.data.data)
            setLoader(false)


        }

        fetch()

    }, [])



    const addtoCart = async (id) => {
        try {
            const config = {
                headers: {
                    bookid: id, // Include the bookid in the headers
                    Authorization: `Bearer ${localStorage.getItem("token")}` // Include the token
                }
            };
    
    
            const response = await axios.put(routes.addtoCart, null, config); // Pass null for the request body
            if(response.data.err == false){
                toast.success(response.data.message );
            
            }
            else{
                toast.error(response.data.message );
            
            }
        } catch (error) {
            toast.error(error.response.data.message );

        }
    };

const addtoFavourite = async(id) =>{
try {
    const config = {
headers :{
id : id,
authorization : `Bearer ${localStorage.getItem("token")}`

}   }

const response = await axios.put(routes.addtoFavourite , null ,config)
console.log("response => " , response);

if(response.data.err == false){
    toast.success(response.data.message );

}
else{
    toast.error(response.data.message );

}






} catch (error) {
    console.log("error => " , error);
    toast.error(error.response.data.message );
    
}


}




    return (
        // w-full  md:w-full sm:w-full lg:w-3/6
        <>




            {loader ? (<div className="flex items-center justify-center my-8 min-h-screen">

                <Loader />
            </div>) : (




                <div className="pb-40 md:pb-20 px-12 py-8 bg-zinc-900 flex  gap-4 flex-col md:flex-row  ">
                                    <ToastContainer />
                    
                    <div className="bg-zinc-800 p-4 rounded h-[80vh]  flex items-center  justify-center w-full md:w-3/6 gap-8 flex-wrap">

                        <img src={book.url} alt="/" className="h-[70vh]" />


                        <div className=" text-white flex flex-row     justify-items-center gap-5">
                            <FaCartShopping className="cursor-pointer text-4xl  md:text-5xl" onClick={()=>addtoCart(book._id)} />
                            <FaHeart  className="cursor-pointer text-4xl  md:text-5xl" onClick={()=>addtoFavourite(book._id)}/>
                        </div>
                    </div>


                    <div className="p-4 rounded w-full md:w-3/6 ">

                        <h1 className="text-zinc-400 text-4xl font-semibold">{book.title}</h1>

                        <p className="text-zinc-500 text-lg mt-1">By : {book.author}</p>

                        <p className="mt-4 text-zinc-400">{book.description}</p>

                        <div className=" mt-4 flex items-center gap-1 text-zinc-400">
                            <GrLanguage className="me-3" />
                            <p className=" text-zinc-400">
                                {book.language} </p>
                        </div>

                        <div className="mt-4 flex items-center gap-1 text-zinc-400">
                            <p className=" text-zinc-400 text-2xl">Price : ${book.price}</p>
                        </div>

                    </div>
                </div>
            )}







        </>


    )
}