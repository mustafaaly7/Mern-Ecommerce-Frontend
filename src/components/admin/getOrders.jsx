import { useState, useEffect } from "react";
import axios from "axios";
import { routes } from "../../constants/constant";
import { toast, ToastContainer } from "react-toastify";

export default function UserOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(routes.getAllOrders, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setOrders(response.data.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
        toast.error("Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await axios.put(
        `${routes.updateOrder}${orderId}`,
        { status: newStatus },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      
      if (response.status == 200) {
        toast.success("Order status updated successfully");
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, status: newStatus } : order
          )
        );
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Failed to update order status");
    }
  };

  const statusColors = {
    pending: "bg-yellow-500",
    shipped: "bg-blue-500",
    delivered: "bg-green-500",
    cancelled: "bg-red-500",
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8 min-h-screen bg-zinc-800">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-100"></div>
      </div>
    );
  }

  return (
    <div className="bg-zinc-800 min-h-screen pb-16 text-amber-100">
      <ToastContainer />
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-8 text-center">Manage Orders</h2>
        
        {orders.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-400">No orders found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full bg-zinc-700 rounded-lg overflow-hidden">
              <thead className="bg-zinc-900">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium">Order ID</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Book</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">User</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Price</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Date</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-600">
                {orders.map((order) => (
                  <tr key={order._id} className="hover:bg-zinc-600 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium truncate max-w-xs">{order._id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img 
                            className="h-10 w-10 rounded-md object-cover" 
                            src={order.book?.url || "https://via.placeholder.com/50"} 
                            alt={order.book?.title} 
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium">{order.book?.title}</div>
                          <div className="text-sm text-gray-400">{order.book?.author}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm">{order.user?.fullname}</div>
                      <div className="text-sm text-gray-400">{order.user?.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      ${order.book?.price?.toFixed(2) || "0.00"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[order.status] || 'bg-gray-500'}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        className="bg-zinc-800 border border-zinc-600 text-amber-100 rounded-md px-3 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      >
                        <option value="pending">Pending</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}