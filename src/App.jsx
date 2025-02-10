import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import RecipeList from './Pages/RecipeList'
import CreateRecipe from './Pages/CreateRecipe'
import UserProfile from './Pages/UserProfile'
import Navigation from './Components/Navigation'
import RecipeDetail from "./Pages/RecipeDetail"
import Footer from './Pages/Footer'
import LoginPage from './Pages/Loginpage'
import ForgotPassword from './Pages/Forgot-password';

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/recipes" element={<RecipeList />} />
        <Route path="/create" element={<CreateRecipe />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path='/recipe/:id' element={<RecipeDetail/>}/>
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;