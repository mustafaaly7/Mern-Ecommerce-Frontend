import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { routes } from "../../constants/constant";

export default function AddBookForm() {
  const [formData, setFormData] = useState({
    url: "",
    author: "",
    title: "",
    price: "",
    description: "",
    language: "English"
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.url) newErrors.url = "URL is required";
    if (!formData.author) newErrors.author = "Author is required";
    if (!formData.title) newErrors.title = "Title is required";
    if (!formData.price) newErrors.price = "Price is required";
    if (!formData.description) newErrors.description = "Description is required";
    if (!formData.language) newErrors.language = "Language is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddBook = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fill all required fields");
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await axios.post(routes.addBook, formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
        }
      });
      console.log("response " , response);
      

      if (response.status == 200) {
        toast.success("Book added successfully!");
        setFormData({
          url: "",
          author: "",
          title: "",
          price: "",
          description: "",
          language: "English"
        });
      }
    } catch (error) {
      console.error("Error adding book:", error);
      toast.error(error.response?.data?.message || "Failed to add book");
    } finally {
      setLoading(false);
    }
  };

  const languages = [
    "English", "Spanish", "French", "German", "Chinese",
    "Hindi", "Arabic", "Russian", "Portuguese", "Japanese"
  ];

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
              <label className="block text-amber-100 mb-2">Title*</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`w-full bg-zinc-700 border ${errors.title ? 'border-red-500' : 'border-zinc-600'} rounded-md px-4 py-2 text-amber-100 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                placeholder="Book Title"
                required
              />
              {errors.title && <p className="text-red-400 text-sm mt-1">{errors.title}</p>}
            </div>
            
            <div>
              <label className="block text-amber-100 mb-2">Author*</label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                className={`w-full bg-zinc-700 border ${errors.author ? 'border-red-500' : 'border-zinc-600'} rounded-md px-4 py-2 text-amber-100 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                placeholder="Author Name"
                required
              />
              {errors.author && <p className="text-red-400 text-sm mt-1">{errors.author}</p>}
            </div>
            
            <div>
              <label className="block text-amber-100 mb-2">Price ($)*</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className={`w-full bg-zinc-700 border ${errors.price ? 'border-red-500' : 'border-zinc-600'} rounded-md px-4 py-2 text-amber-100 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                placeholder="0.00"
                min="0.01"
                step="0.01"
                required
              />
              {errors.price && <p className="text-red-400 text-sm mt-1">{errors.price}</p>}
            </div>
          </div>
          
          {/* Right Column */}
          <div className="space-y-4">
            <div>
              <label className="block text-amber-100 mb-2">Book URL*</label>
              <input
                type="text"
                name="url"
                value={formData.url}
                onChange={handleChange}
                className={`w-full bg-zinc-700 border ${errors.url ? 'border-red-500' : 'border-zinc-600'} rounded-md px-4 py-2 text-amber-100 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                placeholder="Enter book URL"
                required
              />
              {errors.url && <p className="text-red-400 text-sm mt-1">{errors.url}</p>}
            </div>

            <div>
              <label className="block text-amber-100 mb-2">Language*</label>
              <select
                name="language"
                value={formData.language}
                onChange={handleChange}
                className={`w-full bg-zinc-700 border ${errors.language ? 'border-red-500' : 'border-zinc-600'} rounded-md px-4 py-2 text-amber-100 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                required
              >
                {languages.map(lang => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
              {errors.language && <p className="text-red-400 text-sm mt-1">{errors.language}</p>}
            </div>
          </div>
        </div>
        
        <div>
          <label className="block text-amber-100 mb-2">Description*</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={`w-full bg-zinc-700 border ${errors.description ? 'border-red-500' : 'border-zinc-600'} rounded-md px-4 py-2 text-amber-100 focus:outline-none focus:ring-1 focus:ring-blue-500 min-h-[120px]`}
            placeholder="Book description"
            required
          />
          {errors.description && <p className="text-red-400 text-sm mt-1">{errors.description}</p>}
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