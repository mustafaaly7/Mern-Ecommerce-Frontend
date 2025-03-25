import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { routes } from "../../constants/constant";

export default function AddBookForm() {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    price: "",
    description: "",
    coverImage: null,
    preview: null
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        coverImage: file,
        preview: URL.createObjectURL(file)
      }));
    }
  };

  const handleAddBook = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('author', formData.author);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('description', formData.description);
      if (formData.coverImage) {
        formDataToSend.append('coverImage', formData.coverImage);
      }

      const response = await axios.post(routes.addBook, formDataToSend, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success) {
        toast.success("Book added successfully!");
        setFormData({
          title: "",
          author: "",
          price: "",
          description: "",
          coverImage: null,
          preview: null
        });
      }
    } catch (error) {
      console.error("Error adding book:", error);
      toast.error(error.response?.data?.message || "Failed to add book");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-zinc-800 rounded-lg shadow-lg p-6 mb-8">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-6 text-amber-100 border-b border-zinc-600 pb-2">
        Add New Book
      </h2>
      
      <form onSubmit={handleAddBook} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            <div>
              <label className="block text-amber-100 mb-2">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full bg-zinc-700 border border-zinc-600 rounded-md px-4 py-2 text-amber-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Book Title"
                required
              />
            </div>
            
            <div>
              <label className="block text-amber-100 mb-2">Author</label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                className="w-full bg-zinc-700 border border-zinc-600 rounded-md px-4 py-2 text-amber-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Author Name"
                required
              />
            </div>
            
            <div>
              <label className="block text-amber-100 mb-2">Price ($)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full bg-zinc-700 border border-zinc-600 rounded-md px-4 py-2 text-amber-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="0.00"
                min="0"
                step="0.01"
                required
              />
            </div>
          </div>
          
          {/* Right Column */}
          <div className="space-y-4">
            <div>
              <label className="block text-amber-100 mb-2">Cover Image</label>
              <div className="flex items-center space-x-4">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-zinc-600 rounded-lg cursor-pointer bg-zinc-700 hover:bg-zinc-600">
                  {formData.preview ? (
                    <img 
                      src={formData.preview} 
                      alt="Preview" 
                      className="h-full w-full object-cover rounded-lg"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg className="w-8 h-8 mb-3 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                      </svg>
                      <p className="mb-2 text-sm text-zinc-400">Click to upload</p>
                    </div>
                  )}
                  <input 
                    type="file" 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <label className="block text-amber-100 mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full bg-zinc-700 border border-zinc-600 rounded-md px-4 py-2 text-amber-100 focus:outline-none focus:ring-1 focus:ring-blue-500 min-h-[120px]"
            placeholder="Book description..."
            required
          />
        </div>
        
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            {loading && (
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            )}
            {loading ? "Adding..." : "Add Book"}
          </button>
        </div>
      </form>
    </div>
  );
}