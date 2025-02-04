import react from "react"

function Hero() {
    return (
        <div className="w-full md:h-[600px] h-[550px] -mt-16 -z-10 relative mb-3">

            <div className="absolute md:w-[500px] w-full  z-50 md:left-10 md:top-24 left-2 top-48 text-white">
                <h1 className="md:text-5xl p-5 md:font-medium text-4xl ">Discover Your Next Favourite Recipe Today!</h1>
                <p className="p-5 text-justify">Explore a curated collection of trending and popular recipes.Find inspiration for every meal and occasion,all in one place.</p>
                <div className="p-5 flex w-full place-content-center md:place-content-start">
                    <button type="button" className="py-2 px-2 mr-4 font-medium bg-black text-white rounded-md w-[100px] text-center hover:bg-green-500 hover:text-white transition duration-300"
                    >Explore</button>
                    <button type="button" className="py-2 px-2 font-medium bg-black text-white rounded-md w-[100px] text-center hover:bg-green-500 hover:text-white transition duration-300"
                    >Sign Up</button>
                </div>
            </div>

            {/* <img src="https://images.pexels.com/photos/2802527/pexels-photo-2802527.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Hero" className="w-full h-[400px]"/> */}
            <video muted loop autoPlay title="Welcome" className="w-full h-full  object-cover md:opacity-100 opacity-80 ">
                <source src="https://videos.pexels.com/video-files/3209700/3209700-uhd_2560_1440_25fps.mp4" type="video/mp4" />
            </video>
        </div>
    )
}
export default Hero;