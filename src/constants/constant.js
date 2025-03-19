
const LOCAL_PORT="http://localhost:4001/"
 

const devurl = import.meta.env.VITE_REACT_APP_URL
export const routes = {
  recentBooks: devurl + "book/recent-books",
  allBooks: devurl + "book/",
  signleBook: devurl + "book/",
  signup: devurl + "auth/signup",
  login: devurl + "auth/signin",
  profile : devurl + "auth/myinfo",
addtoCart : devurl + "cart/add-to-cart",
getCart : devurl + "cart/get-user-cart",
addtoFavourite : devurl + "favourite/addtofavourite",
removeFromCart : devurl + "cart/remove-from-cart/",
removeFromFavourite : devurl +"favourite/remove-book"

};
