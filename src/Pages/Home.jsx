import React from "react"
import Hero from "../Components/Hero"
import Explore from "../Components/Explore"
import Discover from "../Components/Discover"
import FavRecipes from "../Components/FavRecipes";
// import RecipeAIBot from "../Components/RecipeAIBot";

function Home() {

  return (
    <div>
      <Hero />
      <Explore />
      <Discover/>
      <FavRecipes/>
     
    </div>


  )
}
export default Home;