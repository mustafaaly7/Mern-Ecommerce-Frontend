
const LOCAL_PORT="http://localhost:4001/"
 
// console.log("port" ,  import.meta.env.VITE_REACT_APP_URL);

const devurl = import.meta.env.VITE_REACT_APP_URL
export const routes = {
  recentBooks: devurl + "book/recent-books",
  allBooks: devurl + "book/",
};
