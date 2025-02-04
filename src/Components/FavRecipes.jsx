import react from "react"
function FavRecipes(){
    return(
        <div className="bg-white text-black flex flex-col  place-content-around p-0 md:p-3">
           <div className="p-5 flex flex-col md:flex-row md:justify-around">
                <div className="md:w-[500px] w-full  ">
                    <h1 className="md:pb-2 pb-1 md:p-1 p-4 text-base font-medium ">Discover</h1>
                    <h2 className="text-4xl p-3 md:p-0 -t-medium bree-serif-regular leading-tight">Find Your
                         Favourite Recipes with Ease</h2>
                    <p className="md: text-justify md:pt-8 roboto w-full ">
                            Searching for the perfect recipe has never been easier.Use our 
                            intuitive search bar to explore a world of culinary delights.</p>
                            <div className="flex space-x-6 py-10">
                                <div className="items-center ">
                                    <i className="fa-solid fa-magnifying-glass text-black-500 text-2xl py-5"></i>
                                    <h3 className="text-2xl font-medium py-3">Search Recipes</h3>
                                    <p className="text-sm py-2">Enter ingredients,cuisine types,
                                                or recipe names to find delicious options.</p>
                                </div>
                                <div className="items-center ">
                                    <i className="fa-solid fa-cube text-black-500 text-2xl py-5"></i>
                                        <h3 className="text-2xl font-medium py-3">Get Cooking</h3>
                                            <p className="text-sm py-2">Start your culinary adventure today with 
                                            our easy-to-use seach tool.</p>
                                </div>
                                </div>
                                <div className="space-x-6 py-4">
                                <button className="px-5 py-2 border-2 border-black bg-white-100 text-black hover:scale-105">Search</button>
                                <button className="px-5 py-2 bg-white text-black hover:text-lg">Share</button>
        
                                </div>
                </div>
                <div className="w-full sm:w-1/2 lg:m-4 object-fill p-5">
                    <img src="https://images.pexels.com/photos/19037599/pexels-photo-19037599/free-photo-of-fusilli-pasta-with-tomato-and-basil.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" className="lg:h-[500px] w-[450px]" alt="favrecipe"/>
                </div>
            </div>
        </div>

    )
}
export default FavRecipes;