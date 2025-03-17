import axios from "axios";
import { useEffect, useState } from "react";
import { routes } from "../constants/constant";
import Bookcard from "../components/bookcard";
import Loader from "../components/loader";
import { FaTrash } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";



export default function Cart(){
    const [cart, setCart] = useState([]);
    const [loader, setLoader] = useState(false);
  
    useEffect(() => {
      setLoader(true);
      const fetchCart = async () => {
        try {
          const response = await axios.get(routes.getCart, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          });
          setCart(response?.data?.data || []);
        } catch (error) {
          toast.error("Failed to load cart");
        } finally {
          setLoader(false);
        }
      };
      fetchCart();
    }, []);
  
    const removeFromCart = async (id) => {
      try {


        await axios.put(`${routes.removeFromCart}${id}`,null, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setCart(cart.filter((book) => book._id !== id));
        toast.success("Removed from cart");
      } catch (error) {
        console.log("error => " , error.response.data.message);
        console.log("error => " , error.response);
        
        toast.error("Error removing book");
      }
    };
  
    return (
      <div className="p-8 bg-zinc-900 min-h-screen">
        <ToastContainer />
        <h1 className="text-amber-100 text-4xl text-center">Cart</h1>
        {loader ? (
          <div className="flex items-center justify-center my-8 min-h-screen">
            <Loader />
          </div>
        ) : (
          <div className="my-8 grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 text-center">
            {cart.map((book) => (
              <div key={book._id} className="relative">
                <Bookcard data={book} />
                <FaTrash
                  className="absolute top-2 right-2 text-red-500 cursor-pointer text-xl"
                  onClick={() => removeFromCart(book._id)}
                />
              </div>
            ))}
          </div>
        )}
        {cart.length > 0 && (
          <div className="text-center mt-8">
            <button className="px-6 py-2 bg-blue-500 text-white rounded-md">Proceed to Checkout</button>
          </div>
        )}
      </div>
    );
  }
  





 