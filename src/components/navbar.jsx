import logo1 from "../../public/images/logo1.png"

export default function Navbar(){

const links=[

{
    title : "Home"  ,
    link: "/",
},
{
    title :"About Us"  ,
    link :"/about-us"
},{
    title : "All Books" ,
    link :"/all-books"
},{
    title : "Cart" ,
    link :"/cart"
},{
    title : "Profile"  ,
    link :"/profile"
}

]



return(
<>
<div className="bg-gray-800 px-4 py-2 flex items-center justify-between">

<div className="flex items-center gap-4">
<img src={logo1} alt="" className="w-12 h-12 cursor-pointer" />

    <h1 className="text-white text-2xl font-bold cursor-pointer  hover:text-gray-200">Book Heaven</h1>
</div>
<div >

<ul className="flex items-center flex-row gap-4 flex-wrap">


{links.map((items,i)=>{
    return(
        
        <li key={i} className=" text-white cursor-pointer hover:text-gray-200">{items.title}</li>
    )    
})}
</ul>



</div>




</div>




</>




)

}
