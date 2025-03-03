import axios from "axios";
import { useEffect, useState } from "react";
import { routes } from "../constants/constant";
import { useSelector } from "react-redux";
import Loader from "../components/loader";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("favorites"); // State to manage active tab

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(routes.profile, { headers });
        setUser(response.data.data);
      } catch (error) {
        console.log("error=>", error);
      }
    };

    fetchUser();
  }, []);

  // Placeholder for the sign-out function
  const handleSignOut = () => {
    // Add your sign-out logic here
    console.log("User signed out");
    // Example: Clear local storage and redirect to login
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    window.location.href = "/login"; // Redirect to login page
  };

  const renderTabContent = (info) => {
    switch (activeTab) {
      case "favorites":
        return (
          <div className="w-full p-4">
            <h2 className="text-2xl font-semibold mb-4">Favourite Books</h2>
            {info.favourites.length > 0 ? (
              <ul className="list-disc list-inside">
                {info.favourites.map((book, index) => (
                  <li key={index} className="text-gray-300">{book}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400">No favourite books added yet.</p>
            )}
          </div>
        );
      case "cart":
        return (
          <div className="w-full p-4">
            <h2 className="text-2xl font-semibold mb-4">Cart</h2>
            {info.cart.length > 0 ? (
              <ul className="list-disc list-inside">
                {info.cart.map((item, index) => (
                  <li key={index} className="text-gray-300">{item}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400">Your cart is empty.</p>
            )}
          </div>
        );
      case "orders":
        return (
          <div className="w-full p-4">
            <h2 className="text-2xl font-semibold mb-4">Orders</h2>
            {info.orders.length > 0 ? (
              <ul className="list-disc list-inside">
                {info.orders.map((order, index) => (
                  <li key={index} className="text-gray-300">{order}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400">No orders placed yet.</p>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-zinc-800 min-h-screen pb-16"> {/* Added padding-bottom */}
      {user ? (
        user.map((info, index) => (
          <section key={index} className="w-full overflow-hidden bg-zinc-900 text-amber-100">
            {/* Cover Image */}
            <img
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw5fHxjb3ZlcnxlbnwwfDB8fHwxNzEwNzQxNzY0fDA&ixlib=rb-4.0.3&q=80&w=1080"
              alt="User Cover"
              className="w-full xl:h-[20rem] lg:h-[18rem] md:h-[16rem] sm:h-[14rem] h-[11rem]"
            />

            {/* Profile Image & Name */}
            <div className="sm:w-[80%] w-[90%] mx-auto flex items-center">
              <img
                src={info.avatar}
                alt="User Profile"
                className="rounded-md lg:w-[12rem] lg:h-[12rem] md:w-[10rem] md:h-[10rem] sm:w-[8rem] sm:h-[8rem] w-[7rem] h-[7rem] outline outline-2 outline-offset-2 outline-blue-500 relative lg:bottom-[5rem] sm:bottom-[4rem] bottom-[3rem]"
              />
              <h1 className="w-full text-left my-4 sm:mx-4 pl-4 lg:text-4xl md:text-3xl sm:text-3xl text-xl font-serif">
                {info.fullname}
              </h1>
            </div>

            {/* Tabs for Favorites, Cart, and Orders */}
            <div className="w-full flex justify-center mt-4">
              <button
                onClick={() => setActiveTab("favorites")}
                className={`px-4 py-2 mx-2 ${activeTab === "favorites" ? "bg-blue-500" : "bg-zinc-700"} rounded-t-lg`}
              >
                Favorites
              </button>
              <button
                onClick={() => setActiveTab("cart")}
                className={`px-4 py-2 mx-2 ${activeTab === "cart" ? "bg-blue-500" : "bg-zinc-700"} rounded-t-lg`}
              >
                Cart
              </button>
              <button
                onClick={() => setActiveTab("orders")}
                className={`px-4 py-2 mx-2 ${activeTab === "orders" ? "bg-blue-500" : "bg-zinc-700"} rounded-t-lg`}
              >
                Orders
              </button>
            </div>

            {/* Tab Content */}
            <div className="w-full bg-zinc-800 p-4 rounded-b-lg">
              {renderTabContent(info)}
            </div>

            {/* User Details */}
            <div className="xl:w-[80%] lg:w-[90%] md:w-[90%] sm:w-[92%] w-[90%] mx-auto flex flex-col gap-4 items-center mt-8">
              <div className="w-full my-auto py-6 flex flex-col justify-center gap-2">
                <div className="w-full flex sm:flex-row flex-col gap-2 justify-center">
                  <div className="w-full">
                    <dl className="text-gray-300 divide-y divide-gray-600">
                      <div className="flex flex-col pb-3">
                        <dt className="mb-1 text-gray-400 md:text-lg">Address</dt>
                        <dd className="text-lg font-semibold">{info.address}</dd>
                      </div>
                      <div className="flex flex-col pt-3">
                        <dt className="mb-1 text-gray-400 md:text-lg">Email</dt>
                        <dd className="text-lg font-semibold">{info.email}</dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>

              {/* Sign Out Button */}
              <div className="w-full flex justify-center mb-12"> {/* Added margin-top for spacing */}
                <button
                  onClick={handleSignOut}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </section>
        ))
      ) : (
        <div className="flex items-center justify-center py-8 min-h-screen bg-zinc-800">
          <Loader />
        </div>
      )}
    </div>
  );
}