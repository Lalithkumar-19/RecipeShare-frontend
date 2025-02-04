import react from "react";
import ExploreCards from "./ExploreCards";
import { data } from "../utils/data";
function Explore() {
    return (
        <div className="bg-white text-black flex flex-col  place-content-around p-0 md:p-3">
           
            <div className="flex flex-col md:flex-row md:justify-around">
                <div className="md:w-[500px] w-full  ">
                    <h1 className="md:pb-2 pb-1 md:p-1 p-4 text-base font-medium ">Explore</h1>
                    <h2 className="text-4xl p-4 md:p-0 -t-medium bree-serif-regular leading-tight">Discover Delicious Recipes For Every Meal</h2>
                </div>
                <p className="p-5 md:pl-3  text-justify md:pt-8 pt-1 leading-8 roboto w-full md:w-[500px]  ">Whether you're looking for a quick breakfast,a hearty lunch ,or a sweet
                    dessert,our recipe categories have you covered.Browse through a variety of options tailoured to your taste and dietary preferences.Start your culinary
                    adventure today!
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center">
                {data.map((item, key) => {
                   return <ExploreCards img={item.img} info={item.info} title={item.title} key={key}/>
                })}
               {/* flex md:flex-row flex-col flex-wrap place-items-center md:place-items-start */}
               
            </div>


        </div>
    )
}
export default Explore;