
const LOCAL_PORT="http://localhost:4001/"
 

const devurl = import.meta.env.VITE_REACT_APP_URL
export const routes = {
  // Auth and profile And All users
  signup: devurl + "auth/signup",
  login: devurl + "auth/signin",
  profile : devurl + "auth/myinfo",
Allusers  : devurl + "auth/get-all-users",
deleteUser :devurl + 'auth/delete-user',
  // cart 

addtoCart : devurl + "cart/add-to-cart",
getCart : devurl + "cart/get-user-cart",
removeFromCart : devurl + "cart/remove-from-cart/",

// favourites 
addtoFavourite : devurl + "favourite/addtofavourite",
removeFromFavourite : devurl +"favourite/remove-book",

//orders
getAllOrders : devurl + "order/get-all-orders",
placeOrder : devurl + "order/place-order",
orderHistory : devurl + "order/order-history",
updateOrder : devurl + "order/update-status/",

// books 

addBook : devurl + "book/add-book",
recentBooks: devurl + "book/recent-books",
  allBooks: devurl + "book/",
  signleBook: devurl + "book/",
deleteBook : devurl + "book/delete-book"

};
