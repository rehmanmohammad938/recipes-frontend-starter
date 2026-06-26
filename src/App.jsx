import { useState, useEffect } from 'react'
import './App.css'
import RecipeForm from './components/RecipeForm'
import RecipeList from './components/RecipeList'

// This is your base URL for your API
const API_URL = 'http://localhost:8080'

export default function App() {
  // `recipes` is just a local snapshot — a successful request below won't show up
  // on screen until you also call setRecipes. The server and this state don't auto-sync.
  // AGAIN, the frontend UI state and the server data don't auto-sync - you must do this manually!
  // WHAT DOES THAT MEAN: Just becuase you were able to modify the state/data in the server with the fetch calls, doesn't mean the UI will reflect that automatically.
  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    fetch (`${API_URL}/api/recipes`)
      .then((res) => res.json())
      .then((data) => setRecipes(data))
      .catch((err) => console.error("Error fetching recipes", err))

    }, []);

  function handleAddRecipe(newRecipe) {
    fetch (`${API_URL}/api/recipes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRecipe),
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error("HTTP error!");
      }
      return res.json();
    })
    .catch((error) => {
      console.error("Error adding recipe:", error);
    });
  }

  function handleDeleteRecipe(id) {
    // TODO (Part 3): DELETE `${API_URL}/api/recipes/${id}`, then remove that recipe from `recipes`
  }

  function handleToggleVegetarian(id) {
    // TODO (Stretch): PATCH `${API_URL}/api/recipes/${id}` to flip `vegetarian`, then update `recipes`
  }

  return (
    <div id="app">
      <h1>Recipes</h1>
      <RecipeForm onAdd={handleAddRecipe} />
      <RecipeList
        recipes={recipes}
        onDelete={handleDeleteRecipe}
        onToggleVegetarian={handleToggleVegetarian}
      />
    </div>
  )
}
