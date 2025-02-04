import react from "react"
function Discover(){
    return(
    <div className="place-items-center bg-white py-6">
        <h2 className="text-4xl text-center bree-serif-regular  text-black mb-6">Discover Delicious Recipes Today!</h2>
        <p className="text-black text-center mb-3 ">Join our community to explore,
        share and enjoy a world of culinary delights.</p>
        <div className="space-x-5 py-4">
          <button className="px-5 py-2 border-2 bg-slate-900 text-white hover:scale-105">Explore</button>
          <button className="px-6 py-2 border-2 border-black bg-white text-black hover:scale-105">Share</button>
        </div>
      </div>
    
    )
}
export default Discover;