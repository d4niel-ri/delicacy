import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { callAPI } from "../../domain/api";
import MealCard from "../../components/MealCard/MealCard";
import MoreRecipes from "../../components/MoreRecipes/MoreRecipes";
import useLocalStorage from "../../hooks/useLocalStorage";

const Detail = () => {
  const [meal, setMeal] = useState({});
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useLocalStorage("favorites", []);
  const navigate = useNavigate();
  const routeParams = useParams();

  const fetchMeal = async() => {
    try {
      const data = await callAPI(`/search.php`, 'GET', {}, {s:routeParams.meal_name});
      setMeal(data.meals[0]);
    
    } catch(error) {
      console.error(error);
      alert(error);
    }
  }

  useEffect(() => {
    setLoading(true);
    fetchMeal();
    setLoading(false);
  }, [routeParams])

  return (
    <main>
      <h1 onClick={() => navigate("/")}>Delicacy</h1>
      <div className={styles.detail}>
        {!loading && (
          <MealCard meal={meal} favorites={favorites} setFavorites={setFavorites} inDetailPage={true} />
        )}
      </div>

      <MoreRecipes />
    </main>
  )
}

export default Detail;