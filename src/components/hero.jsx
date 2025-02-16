


export default function Hero() {


    return (
        <>
            <div className=" flex flex-wrap">

                <div className=" w-full lg:w-3/6 flex flex-col gap-4 items-center lg:items-start justify-center">
                    <h1 className="text-6xl text-center lg:text-left font-semibold text-amber-100">

                        Discover Your New Great Read.
                    </h1>
                    <p className="mt-8 text-2xl text-amber-50">Find your next favorite book in our curated collection. Your next great read is waiting for you!</p>
                    <div>
                        <button className="text-amber-100 text-2xl border rounded-full border-yellow-100 bg-zinc-800 px-5 py-3 hover:bg-zinc-700 ">Discover Books</button>
                    </div>
                </div>


                <div className=" w-full lg:w-3/6 h-auto lg:h-[100%] flex items-center justify-center">
                    <img src={"/images/hero.png"} alt="hero" />
                </div>
                <h1 className="text-2xl">

                    Hero
                </h1>
            </div>



        </>


    )
}