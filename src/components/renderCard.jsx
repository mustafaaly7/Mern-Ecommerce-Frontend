export function renderCard  (item) {

    return(

    <div key={item._id} className="bg-zinc-700 rounded-lg shadow-md p-4">
      <img
        src={item.url}
        alt={item.title}
        className="w-full h-48 object-contain rounded-md mb-4"
      />
      <h3 className="text-xl font-semibold text-amber-100">{item.title}</h3>
      <p className="text-gray-400">{item.author}</p>
      <p className="text-gray-400">Price: ${item.price}</p>
    </div>
)
}
  