import { FaTrash } from "react-icons/fa"; // Import the trash icon

export function renderCard(item, onDiscard) {
  return (
    <div key={item._id} className="bg-zinc-700 rounded-lg shadow-md p-4 relative">
      {/* Discard icon */}
      <button
        onClick={onDiscard} // Call the onDiscard function
        className="absolute top-2 right-2 p-2 text-gray-400 hover:text-red-500 transition-colors"
      >
        <FaTrash className="w-5 h-5" /> {/* Trash icon */}
      </button>

      {/* Card content */}
      <img
        src={item.url}
        alt={item.title}
        className="w-full h-48 object-contain rounded-md mb-4"
      />
      <div className="text-center">
      <h3 className="text-xl font-semibold text-amber-100">{item.title}</h3>
      <p className="text-gray-400">{item.author}</p>
      <p className="text-gray-400">Price: ${item.price}</p>
      </div>
    </div>
  );
}