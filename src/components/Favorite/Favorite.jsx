/* eslint-disable react/prop-types */
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import { callAPI } from "../../domain/api";
import { useNavigate } from "react-router-dom";

const Favorite = ({favorites, setFavorites}) => {
  const [favoriteMeals, setFavoriteMeals] = useState([]);
  const navigate = useNavigate();

  const handleClickFavorite = (idMeal) => {
    setFavorites((prev) => prev.filter(id => id != idMeal));
    setFavoriteMeals((prev) => prev.filter(meal => meal.idMeal != idMeal));
  }

  const fetchFavoriteMeals = async() => {
    try {
      // Step 1: Fetch detailed information for each meal
      const mealPromises = favorites.map(async idMeal => {
        const mealData = await callAPI("lookup.php", "GET", {}, {i: idMeal});
        return mealData.meals[0];
      });

      // Step 2: Wait for all meal requests to complete and store the data
      const mealDetails = await Promise.all(mealPromises);
      setFavoriteMeals(mealDetails);
    } catch(error) {
      console.error(error);
      alert(error);
    }
  }

  useEffect(() => {
    fetchFavoriteMeals();
  }, []);

  return (
    <div className={styles.favorite}>
      {favoriteMeals.map((meal) => (
        <div key={meal.idMeal} className={styles.card}>
          <div className={styles.card_image} onClick={() => navigate(`/detail/${meal.strMeal}`)}>
            <img src={`${meal.strMealThumb}/preview`} alt={meal.strMeal} />
          </div>
          <p className={styles.meal_name} onClick={() => navigate(`/detail/${meal.strMeal}`)}>
            {meal.strMeal}
          </p>
          <div className={styles.btn} onClick={() => handleClickFavorite(meal.idMeal)}>
            Remove Favorite
          </div>
        </div>
      ))}
    </div>
  )
}

export default Favorite;