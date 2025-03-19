import axios from "axios";
import { useEffect, useState } from "react";
import { routes } from "../constants/constant";
import Loader from "../components/loader";
import { FaTrash } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";

export default function Cart() {
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
      await axios.put(`${routes.removeFromCart}${id}`, null, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setCart(cart.filter((book) => book._id !== id));
      toast.success("Removed from cart");
    } catch (error) {
      toast.error("Error removing book");
    }
  };

  const totalAmount = cart.reduce((sum, book) => sum + book.price, 0);

  return (
    <div className="p-6 bg-zinc-900 min-h-screen text-amber-100">
      <ToastContainer />
      <h1 className="text-4xl font-bold text-center">Your Cart</h1>
      {loader ? (
        <div className="flex items-center justify-center min-h-screen">
          <Loader />
        </div>
      ) : cart.length > 0 ? (
        <div className="mt-8">
          <div className="hidden md:block">
            <div className="grid grid-cols-5 bg-zinc-800 p-4 rounded-md text-lg font-semibold">
              <span className="col-span-2">Book</span>
              <span>Author</span>
              <span>Price</span>
              <span>Action</span>
            </div>
            {cart.map((book) => (
              <div
                key={book._id}
                className="grid grid-cols-5 items-center border-b border-zinc-700 p-4"
              >
                <div className="col-span-2 flex items-center gap-4">
                  <img
                    src={book.url}
                    alt={book.title}
                    className="w-16 h-24 object-cover rounded-md"
                  />
                  <span>{book.title}</span>
                </div>
                <span>{book.author}</span>
                <span>${book.price}</span>
                <button
                  onClick={() => removeFromCart(book._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash size={20} />
                </button>
              </div>
            ))}
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden">
            {cart.map((book) => (
              <div
                key={book._id}
                className="flex flex-col gap-2 border-b border-zinc-700 p-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={book.url}
                    alt={book.title}
                    className="w-16 h-24 object-cover rounded-md"
                  />
                  <div>
                    <h2 className="text-lg font-semibold">{book.title}</h2>
                    <p className="text-sm text-zinc-400">{book.author}</p>
                    <p className="font-semibold text-amber-100">${book.price}</p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => removeFromCart(book._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-xl font-semibold mb-4">Total: ${totalAmount.toFixed(2)}</p>
            <button className="px-6 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700">
              Proceed to Checkout
            </button>
          </div>
        </div>
      ) : (
        <p className="text-center text-xl text-zinc-400 mt-12">Your cart is empty.</p>
      )}
    </div>
  );
}
