import { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { routes } from "../../constants/constant";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  const fetchUsersWithOrders = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const [usersResponse, ordersResponse] = await Promise.all([
        axios.get(routes.Allusers, {
          headers: { authorization: `Bearer ${token}` },
        }),
        axios.get(routes.getAllOrders, {
          headers: { authorization: `Bearer ${token}` },
        }),
      ]);

      const orderCounts = ordersResponse?.data?.data?.reduce((acc, order) => {
        const userId = order?.user?._id;
        if (userId) {
          acc[userId] = (acc[userId] || 0) + 1;
        }
        return acc;
      }, {}) || {};

      const usersWithOrders = usersResponse?.data?.data?.map(user => ({
        ...user,
        orderCount: orderCounts[user._id] || 0,
      })) || [];

      setUsers(usersWithOrders);
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Failed to fetch users or orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsersWithOrders();
  }, []);

  const handleDelete = async (userId) => {
    try {
      setDeletingId(userId);
      const response = await axios.delete(routes.deleteUser, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
          userid: userId,
        },
      });

      if (response?.data?.success) {
        toast.success(response.data.message);
        setUsers(prev => prev.filter(user => user._id !== userId));
      } else {
        throw new Error("User deletion failed.");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error(error.response?.data?.message || "Failed to delete user.");
    } finally {
      setDeletingId(null);
    }
  };

  const filteredUsers = users.filter(user =>
    user.fullname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-zinc-800 rounded-lg shadow-lg p-6">
      <ToastContainer position="top-right" />
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-amber-100">Manage Users</h2>
          <p className="text-zinc-400 text-sm">
            Total Users: {users.length} | Total Orders:{" "}
            {users.reduce((sum, user) => sum + user.orderCount, 0)}
          </p>
        </div>

        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Search users..."
            className="w-full bg-zinc-700 border border-zinc-600 rounded-md px-4 py-2 text-amber-100 focus:outline-none focus:ring-1 focus:ring-blue-500 pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg
            className="absolute left-3 top-2.5 h-5 w-5 text-zinc-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-100"></div>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-zinc-600">
          <table className="min-w-full divide-y divide-zinc-600">
            <thead className="bg-zinc-900">
              <tr>
                {["Name", "Email", "Role", "Orders", "Actions"].map((head, i) => (
                  <th key={i} className="px-6 py-3 text-left text-xs font-medium text-amber-100 uppercase tracking-wider">
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-zinc-800 divide-y divide-zinc-600">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user._id} className="hover:bg-zinc-700 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-amber-100">
                      {user.fullname || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-amber-100">
                      {user.email || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        user.role === "Admin"
                          ? "bg-purple-600 text-white"
                          : "bg-zinc-600 text-amber-100"
                      }`}>
                        {user.role || "User"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-amber-100">
                      <span className="px-2 py-1 bg-blue-600 text-white rounded-full">
                        {user.orderCount}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleDelete(user._id)}
                        disabled={deletingId === user._id}
                        className={`px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm font-medium ${
                          deletingId === user._id ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                      >
                        {deletingId === user._id ? "Deleting..." : "Delete"}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-zinc-400">
                    {searchTerm ? "No users match your search." : "No users found."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
