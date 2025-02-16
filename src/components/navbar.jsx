import { Link, useNavigate } from "react-router"

export default function Navbar() {
    const navigate = useNavigate()


    const links = [

        {
            title: "Home",
            link: "/",
        },
        // {
        //     title: "About Us",
        //     link: "/about-us"
        // }, 
        {
            title: "All Books",
            link: "/allbooks"
        }, {
            title: "Cart",
            link: "/cart"
        }, {
            title: "Profile",
            link: "/profile"
        }

    ]



    return (
        <>
            <div className="bg-zinc-900 px-6 py-4 flex items-center justify-between flex-wrap">

{/* for logo and img */}
                <div className="flex items-center ">
                    <img src={"/images/logo1.png"} alt="" className="me-4 h-12 cursor-pointer" onClick={() => {
                        navigate("/")
                    }} />

                    <Link className="text-white text-xl font-bold cursor-pointer  hover:text-gray-200" to={'/'}>
                        <h1 >Book Heaven</h1>
                    </Link>
                </div>



                <div className="flex items-center gap-4 flex-wrap" >

{/* for navlinks */}
                    <ul className=" hidden md:flex items-center flex-row gap-4 flex-wrap ">


                        {links.map((items, i) => {
                            return (
                                <Link to={items.link}>
                                    <li key={i} className=" text-white cursor-pointer transation-all duration-300 hover:text-blue-200">{items.title}</li>
                                </Link>
                            )
                        })}
                    </ul>

                    {/* for buttons  */}
                    <div className=" hidden md:flex gap-2 flex-wrap">
                        <button className="text-zinc-200 bg-blue-700 hover:bg-blue-500 hover:text-zinc-100 rounded px-3 py-2 transition-all duration-300" onClick={() => {
                            navigate("/login")
                        }} >Login</button>
                        <button className="text-zinc-200 bg-gray-700 hover:bg-gray-500 hover:text-zinc-100 rounded px-3 py-2 transition-all duration-300" onClick={() => {
                            navigate("/signup")
                        }}>Signup</button></div>

                </div>




            </div>




        </>




    )

}
