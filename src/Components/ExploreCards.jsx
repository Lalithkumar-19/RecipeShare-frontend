import react from "react";
function ExploreCards({img,title,info}){
    return(
       
        <div className="pb-5 w-[400px] p-5  flex  justify-between lg-hover:scale-105 cursor-pointer">
        <div className=" bg-white pt-8 pb-10 shadow  w-[400px] left-10 p-5 h-[400px] m-2">   
            <img src={img} alt="explorecard1" className="w-[400px] height-[450px] m-1 object-fill p-5"/>
              <h1 className="text-x line-clamp-2
              l font-semibold p-5 text-justify pt-1 pb-1">{title}</h1>
               <p className="p-5 line-clamp-2">{info}</p>
        </div>
      
          
        
        </div> 
        
    )
}
export default ExploreCards;