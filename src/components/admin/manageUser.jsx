import { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { routes } from "../../constants/constant";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(routes.getAllUsers, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUsers(response.data.data);
      } catch (error) {
        toast.error("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="bg-zinc-800 rounded-lg shadow-lg p-6">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-6 text-amber-100 border-b border-zinc-600 pb-2">
        Manage Users
      </h2>
      
      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-100"></div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full bg-zinc-700 rounded-lg overflow-hidden">
            <thead className="bg-zinc-900">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium">Name</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Email</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-600">
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-zinc-600 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">{user.fullname}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.role || 'User'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}