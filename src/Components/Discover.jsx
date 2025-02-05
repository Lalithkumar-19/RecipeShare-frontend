import react from "react"
function Discover(){
return(
  <div className="bg-white m-8 p-5 md:bg-white md:m-8 md:p-5">
    <div className="md:text-center md:pb-3 text-center pb-3">
      <h1 className="md:text-black md:bree-serif-regular md:text-4xl md:px-3 md:m-4  text-black bree-serif-regular text-2xl px-3 m-4 ">Discover Delicious Recipes Today!</h1>
      <p className="md:text-black md:text-xl md:roboto text-black text-xl roboto">Join our  community to explore ,share and enjoy a world of culinary delights</p>
      <button type="button" className="md:py-2 md:px-2  md:mr-4 md:mt-4 md:font-medium md:bg-black md:text-white rounded-md w-[100px] md:text-center hover:bg-green-500 hover:text-white transition duration-300
      py-2 px-2 mr-4 mt-4 font-medium bg-black text-white rounded-w-[100px] text-center"
                    >Explore</button>
                      <button type="button" className="py-2 px-2  mr-4 mt-4 font-medium bg-transparent text-black rounded-md w-[100px] text-center hover:bg-green-500 hover:text-white transition duration-300 border-solid border-2 border-stone-950"
                    >Share</button>
    </div>

  </div>
)
}
export default Discover;