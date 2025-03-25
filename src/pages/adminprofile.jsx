import AddBookForm from "../components/admin/addbook";
import UserOrders from "../components/admin/getOrders";

export default function AdminProfile() {
  return (
    <div className="bg-zinc-800 min-h-screen pb-16">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-amber-100">Admin Dashboard</h1>
            <p className="text-zinc-400 mt-2">Manage books and orders</p>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="flex items-center space-x-4">
              <span className="text-amber-100">Welcome, Admin</span>
              <button 
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("id");
                  window.location.href = "/login";
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Add Book Form - Takes full width on mobile, 1/3 on desktop */}
          <div className="lg:col-span-1">
            <AddBookForm />
          </div>
          
          {/* Orders Table - Takes full width on mobile, 2/3 on desktop */}
          <div className="lg:col-span-2">
            <div className="bg-zinc-800 rounded-lg shadow-lg p-6">
             
              <UserOrders />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}