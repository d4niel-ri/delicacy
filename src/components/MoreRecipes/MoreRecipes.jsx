import { useState, useEffect } from "react";
import { callAPI } from "../../domain/api";
import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";

const MoreRecipes = () => {
  const [randomMeals, setRandomMeals] = useState([]);
  const navigate = useNavigate();

  // Function to fetch a random meal
  const fetchRandomMeal = async () => {
    try {
      const data = await callAPI("random.php", "GET");
      const randomMeal = data.meals[0];
      setRandomMeals(prevRandomMeals => [...prevRandomMeals, randomMeal]);
    } catch (error) {
      console.error('Error fetching random meal:', error);
    }
  };

  // Function to fetch 5 random meals
  const fetchFiveRandomMeals = async () => {
    setRandomMeals([]); // Clear previous random meals
    for (let i = 0; i < 5; i++) {
      await fetchRandomMeal();
    }
  };

  useEffect(() => {
    fetchFiveRandomMeals();

    return () => setRandomMeals([]);
  }, []);

  console.log(randomMeals);

  return (
    <div className={styles.more_recipes}>
      <h3>More Recipes</h3>
      <div className={styles.recipes}>
        {randomMeals.map((randomMeal) => (
          <div key={randomMeal.idMeal} 
            className={styles.card} 
            onClick={() => navigate(`/detail/${randomMeal.strMeal}`)}
          >
            <div className={styles.card_image}>
              <img src={randomMeal.strMealThumb} alt={randomMeal.strMeal} />
            </div>
            <p className={styles.meal_name}>{randomMeal.strMeal}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MoreRecipes;