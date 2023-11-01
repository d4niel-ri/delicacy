import { useEffect, useState } from 'react';
import './App.css'
import Navigation from './components/Navigation/Navigation'
import styles from "./styles.module.scss";
import { callAPI } from "./domain/api";
import MoreRecipes from './components/MoreRecipes/MoreRecipes';

function App() {
  const [navChosen, setNavChosen] = useState("Beef");
  const [meals, setMeals] = useState([]);
  console.log(navChosen);

  const fetchMeals = async() => {
    try {
      // Step 1: Fetch meal IDs based on the category
      const categoryData = await callAPI("filter.php", "GET", {}, {c: navChosen});
      const mealIds = categoryData.meals.map(meal => meal.idMeal).slice(0,5);
      
      // Step 2: Fetch detailed information for each meal
      const mealPromises = mealIds.map(async mealId => {
        const mealData = await callAPI("lookup.php", "GET", {}, {i: mealId});
        return mealData.meals[0];
      })

      // Step 3: Wait for all meal requests to complete and store the data
      const mealDetails = await Promise.all(mealPromises);
      console.log(mealDetails);
      setMeals(mealDetails);
    } catch(error) {
      console.error(error);
      alert(error);
    }
  }

  useEffect(() => {
    if (navChosen === "Favorite") return;
    fetchMeals();

  }, [navChosen]);

  return (
    <main>
      <h1>Delicacy</h1>
      <Navigation navChosen={navChosen} setNavChosen={setNavChosen} />
      <MoreRecipes />
    </main>
  )
}

export default App
