import { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { routes } from "../../constants/constant";

export default function ManageBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
const [updateBooks , setUpdatedBooks] = useState(false)

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(routes.allBooks, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setBooks(response.data.data);
      } catch (error) {
        toast.error("Failed to fetch books");
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, [updateBooks]);

  const handleDelete = async (id) => {
    try {
      
      const response = await axios.delete(routes.deleteBook, {
        headers: {
          bookid : id,
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("response" , response);
      
     toast.success( response.data.message || "Book Delete succesfully" )
     setUpdatedBooks(!updateBooks)
    } catch (error) {
      toast.error("Failed to delete book");
      console.log("error" , error);
      
    }
  };

  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-zinc-800 rounded-lg shadow-lg p-6">
      <ToastContainer />
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <h2 className="text-2xl font-bold text-amber-100">Manage Books</h2>
        
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Search books..."
            className="w-full bg-zinc-700 border border-zinc-600 rounded-md px-4 py-2 text-amber-100 focus:outline-none focus:ring-1 focus:ring-blue-500 pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg
            className="absolute left-3 top-2.5 h-5 w-5 text-zinc-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
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
                <th className="px-6 py-3 text-left text-xs font-medium text-amber-100 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-amber-100 uppercase tracking-wider">
                  Author
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-amber-100 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-amber-100 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-zinc-800 divide-y divide-zinc-600">
              {filteredBooks.length > 0 ? (
                filteredBooks.map((book) => (
                  <tr key={book._id} className="hover:bg-zinc-700 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-amber-100">{book.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-amber-100">{book.author}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-amber-100">${book.price.toFixed(2)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleDelete(book._id)}
                        className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm font-medium"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-6 py-4 text-center text-zinc-400">
                    {searchTerm ? "No books match your search" : "No books found"}
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