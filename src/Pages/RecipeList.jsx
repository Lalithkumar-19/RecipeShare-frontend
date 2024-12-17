import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function RecipeList() {
  const [recipes] = useState([
    { id: 1, title: 'Spaghetti Carbonara', rating: 4.5, image: 'https://images.unsplash.com/photo-1512058564366-c9e8e0f02b5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', prepTime: '20 mins', difficulty: 'Easy' },
    { id: 2, title: 'Chicken Tikka Masala', rating: 4.7, image: 'https://images.unsplash.com/photo-1601050692294-6d1fed8a3ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', prepTime: '40 mins', difficulty: 'Medium' },
    { id: 3, title: 'Vegetable Stir Fry', rating: 4.2, image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', prepTime: '15 mins', difficulty: 'Easy' },
    { id: 4, title: 'Beef Wellington', rating: 4.8, image: 'https://images.unsplash.com/photo-1609894077615-c34e4c9801c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', prepTime: '2 hrs', difficulty: 'Hard' },
    { id: 5, title: 'Chocolate Lava Cake', rating: 4.9, image: 'https://images.unsplash.com/photo-1599785209707-70a6c3e389d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', prepTime: '30 mins', difficulty: 'Medium' },
    { id: 6, title: 'Caesar Salad', rating: 4.3, image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', prepTime: '10 mins', difficulty: 'Easy' },
    { id: 7, title: 'Margherita Pizza', rating: 4.6, image: 'https://images.unsplash.com/photo-1600685165266-5091fc08dc03?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', prepTime: '25 mins', difficulty: 'Easy' },
    { id: 8, title: 'Grilled Salmon', rating: 4.7, image: 'https://images.unsplash.com/photo-1562967916-eb82221dfb34?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', prepTime: '35 mins', difficulty: 'Medium' },
    { id: 9, title: 'Pancakes', rating: 4.4, image: 'https://images.unsplash.com/photo-1581618582227-c11791cd90f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', prepTime: '15 mins', difficulty: 'Easy' },
    { id: 10, title: 'Sushi Rolls', rating: 4.9, image: 'https://images.unsplash.com/photo-1572495676502-7901f34b027d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', prepTime: '50 mins', difficulty: 'Hard' },
    { id: 11, title: 'BBQ Ribs', rating: 4.8, image: 'https://images.unsplash.com/photo-1546491766-8a94605c07c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', prepTime: '2 hrs', difficulty: 'Hard' },
    { id: 12, title: 'Tacos', rating: 4.6, image: 'https://images.unsplash.com/photo-1603399087521-008dc1e9f5dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', prepTime: '20 mins', difficulty: 'Easy' },
    { id: 13, title: 'Pumpkin Soup', rating: 4.4, image: 'https://images.unsplash.com/photo-1562967916-eb82221dfb34?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', prepTime: '30 mins', difficulty: 'Easy' },
    { id: 14, title: 'Mushroom Risotto', rating: 4.7, image: 'https://images.unsplash.com/photo-1610072227485-c49a6e05f3e6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', prepTime: '45 mins', difficulty: 'Medium' },
    { id: 15, title: 'Creme Brulee', rating: 4.9, image: 'https://images.unsplash.com/photo-1604697962877-b9e7377a9918?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', prepTime: '1 hr', difficulty: 'Medium' }
  ]);


  return (
    <div className="bg-gray-100 min-h-screen p-6 w-[100%] mt-4">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Our Recipes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {recipes.map((recipe) => (
          <Link
            key={recipe.id}
            to={`/recipe/${recipe.id}`}
            className="bg-white rounded-lg shadow-lg overflow-hidden transition duration-300 transform hover:scale-105 hover:shadow-xl"
          >
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2 text-gray-800">{recipe.title}</h2>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <span className="text-yellow-500 text-lg mr-2">★</span>
                  <span className="text-gray-600 font-medium">{recipe.rating.toFixed(1)}</span>
                </div>
                <span className="text-sm text-gray-500">{recipe.prepTime}</span>
              </div>
              <div className="text-sm text-gray-500 font-medium">Difficulty: {recipe.difficulty}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default RecipeList;
