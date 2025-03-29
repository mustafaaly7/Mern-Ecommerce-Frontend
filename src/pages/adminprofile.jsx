import { useState } from "react";
import AddBookForm from "../components/admin/addbook";
import UserOrders from "../components/admin/getOrders";
import ManageBooks from "../components/admin/manageBooks";
import ManageUsers from "../components/admin/manageUser";

export default function AdminProfile() {
  const [activeTab, setActiveTab] = useState("addBooks");

  const renderTabContent = () => {
    switch (activeTab) {
      case "addBooks":
        return <AddBookForm />;
      case "manageOrders":
        return <UserOrders />;
      case "manageBooks":
        return <ManageBooks />;
      case "manageUsers":
        return <ManageUsers />;
      default:
        return <AddBookForm />;
    }
  };

  return (
    <div className="bg-zinc-800 min-h-screen pb-16">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-amber-100">Admin Dashboard</h1>
            <p className="text-zinc-400 mt-2">Manage your bookstore</p>
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

        {/* Tabs */}
        <div className="flex overflow-x-auto mb-6 border-b border-zinc-600">
          <button
            onClick={() => setActiveTab("addBooks")}
            className={`px-4 py-2 font-medium ${activeTab === "addBooks" ? 'text-amber-100 border-b-2 border-amber-100' : 'text-zinc-400 hover:text-amber-100'}`}
          >
            Add Books
          </button>
          <button
            onClick={() => setActiveTab("manageOrders")}
            className={`px-4 py-2 font-medium ${activeTab === "manageOrders" ? 'text-amber-100 border-b-2 border-amber-100' : 'text-zinc-400 hover:text-amber-100'}`}
          >
            Manage Orders
          </button>
          <button
            onClick={() => setActiveTab("manageBooks")}
            className={`px-4 py-2 font-medium ${activeTab === "manageBooks" ? 'text-amber-100 border-b-2 border-amber-100' : 'text-zinc-400 hover:text-amber-100'}`}
          >
            Manage Books
          </button>
          <button
            onClick={() => setActiveTab("manageUsers")}
            className={`px-4 py-2 font-medium ${activeTab === "manageUsers" ? 'text-amber-100 border-b-2 border-amber-100' : 'text-zinc-400 hover:text-amber-100'}`}
          >
            Manage Users
          </button>
        </div>

        {/* Main Content */}
        <div className="bg-zinc-800 rounded-lg shadow-lg p-6">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}