import { Link, useLocation, useNavigate } from "react-router"
import { GiHamburgerMenu } from "react-icons/gi";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";







export default function Navbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation()

  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  const links = [
    { title: "Home", link: "/" },
    { title: "All Books", link: "/allbooks" },
    { title: "Cart", link: "/cart" },
    { title: "Profile", link: "/profile" },
  ];


  //getting the  store auth state using use selector react redux  
const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn)

if(isLoggedIn === false){
  links.splice(2,2)
}


  return (
    <>
      <nav className="relative z-50 bg-zinc-900 px-6 py-4 flex items-center justify-between flex-wrap">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src="/images/logo1.png"
            alt="Logo"
            className="me-4 h-12 cursor-pointer"
            onClick={() => navigate("/")}
          />
          <Link className="text-white text-xl font-semibold font-serif cursor-pointer hover:text-gray-200" to="/">
            Book Heaven
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4 flex-wrap">
          <ul className="flex items-center flex-row gap-4 flex-wrap">
            {links.map((item, i) => (
              <Link key={i} to={item.link}>
                <li className="text-white cursor-pointer transition-all duration-300 hover:text-blue-200">
                  {item.title}
                </li>
              </Link>
            ))}
          </ul>

          {/* Buttons */}
          <div className="flex gap-2">
            <button
              className="text-zinc-200 bg-blue-700 hover:bg-blue-500 hover:text-zinc-100 rounded px-3 py-2 transition-all duration-300"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
            <button
              className="text-zinc-200 bg-gray-700 hover:bg-gray-500 hover:text-zinc-100 rounded px-2 py-2 transition-all duration-300"
              onClick={() => navigate("/signup")}
            >
              Signup
            </button>
          </div>
        </div>

        {/* Hamburger Menu */}
        <button className="text-white text-2xl md:hidden hover:text-zinc-400" onClick={() => setIsOpen(!isOpen)}>
          <GiHamburgerMenu />
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="h-screen bg-zinc-900 absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center gap-4">
          {links.map((item, i) => (
            <Link key={i} to={item.link}>
              <h3 className="text-2xl font-semibold text-white cursor-pointer transition-all duration-300 hover:text-blue-200">
                {item.title}
              </h3>
            </Link>
          ))}
          <button
            className="text-2xl font-semibold text-zinc-200  bg-blue-700 hover:bg-blue-500 hover:text-zinc-100 rounded px-3 py-2 transition-all duration-300"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
          <button
            className="text-2xl font-semibold text-zinc-200 bg-gray-700 hover:bg-gray-500 hover:text-zinc-100 rounded px-3 py-2 transition-all duration-300"
            onClick={() => navigate("/signup")}
          >
            Signup
          </button>
        </div>
      )}
    </>
  );
}



