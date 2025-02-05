import react from "react"
function FavRecipes() {
    return (
        <div className="bg-white flex-col-reverse text-black md:flex md:flex-row w-full flex place-content-around p-0 md:p-3">
            <div className="p-5 flex flex-col md:w-[50%] md:flex-row md:justify-items-center">
                <div className="md:w-[500px] w-full">
                    <h1 className="md:pb-1 pb-0 md:p-1 p-0 text-base font-medium ">Discover</h1>
                    <h2 className="text-4xl p-0 md:p-1   bree-serif-regular leading-tight">Find Your
                        Favourite Recipes with Ease</h2>
                    <p className="md: text-justify md:pt-3 roboto w-full ">
                        Searching for the perfect recipe has never been easier.Use our
                        intuitive search bar to explore a world of culinary delights.</p>
                    <div className="flex space-x-6 py-10">

                        <div className="items-center ">
                            <i className="fa-solid fa-magnifying-glass text-black-500 text-2xl py-3"></i>
                            <h3 className="text-2xl roboto-with-weight py-3">Search Recipes</h3>
                            <p className="text-sm roboto py-1 mr-1 justify-evenly">Enter ingredients,cuisine types or recipe names to find delicious options.</p>
                        </div>
                        <div className="items-center ">
                            <i className="fa-solid fa-cube text-black-500 text-2xl py-3 ml-3"></i>
                            <h3 className="text-2xl roboto-with-weight py-3 ml-3">Get Cooking</h3>
                            <p className="text-sm roboto py-1 ml-3 justify-evenly text-black">Start your culinary adventure today with our easy-to-use seach tool.</p>
                        </div>
                    </div>
                    <div className="space-x-6 py-4">
                        <button className="px-5 py-2 border-2 border-black bg-white-100 text-black hover:scale-105">Search</button>
                        <button className="px-5 py-2 bg-white text-black hover:text-lg">Explore <i class="fa-sharp fa-thin fa-greater-than text-sm"></i></button>

                    </div>
                </div>
            </div>
            <div className="md:w-[50%] w-full flexobject-fill p-5 md:h-[550px] h-[380px] ">
                <img  src="https://images.pexels.com/photos/9266190/pexels-photo-9266190.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" className="w-full h-full rounded-md" alt="favrecipe" />
            </div>

        </div>

    )
}
export default FavRecipes;