/* eslint-disable react/prop-types */
import styles from "./styles.module.scss";

const MealCard = ({meal, favorites, setFavorites, inDetailPage}) => {
  const ingredients = []
  for (let i = 1; i <= 20; i++) {
    const ingredientName = meal[`strIngredient${i}`];
    const ingredientMeasure = meal[`strMeasure${i}`];
    
    if (ingredientName && ingredientMeasure) {
      ingredients.push({ name: ingredientName, measure: ingredientMeasure });
    }
  }

  const handleClickFavorite = (idMeal) => {
    setFavorites((prev) => prev.includes(idMeal) ? prev.filter(id => id != idMeal) : [...prev, idMeal]);
  }

  return (
    <div className={styles.meal_card}>
      <div className={styles.meal_image}>
        <img src={meal.strMealThumb} alt={meal.strMeal} />
      </div>
      <div className={styles.meal_content}>
        <h1>{meal.strMeal}</h1>
        <div className={styles.instruction}>
          {meal.strInstructions}
        </div>
        <div className={styles.ingredients}>
          <h2>Ingredients</h2>
          <div className={styles.list_ingredients}>
            {ingredients.slice(0, 4).map((ingredient, idx) => (
              <div key={idx} className={styles.item}>
                <div className={styles.item_image}>
                  <img 
                    src={`https://www.themealdb.com/images/ingredients/${ingredient.name}.png`} 
                    alt={ingredient.name} 
                  />
                </div>
                <div className={styles.item_desc}>
                  <div className={styles.item_name}>{ingredient.name}</div>
                  <div className={styles.item_measure}>{ingredient.measure}</div>
                </div>
              </div>
            ))}
          </div>
          <div className={`${styles.buttons} ${inDetailPage ? styles.button_center : ""}`}>
            {!inDetailPage && (
              <a href={`/detail/${meal.strMeal}`} className={styles.btn}>Detail</a>
            )}
            <div className={styles.btn} onClick={() => handleClickFavorite(meal.idMeal)}>
              {favorites.includes(meal.idMeal) ? "Remove Favorite" : "Add to favorites"}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MealCard;