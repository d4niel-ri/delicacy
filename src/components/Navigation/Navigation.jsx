import styles from "./styles.module.scss";

// eslint-disable-next-line react/prop-types
const Navigation = ({navChosen, setNavChosen}) => {
  return (
    <nav>
      <div className={`${navChosen === "Beef" ? styles.chosen : ""}`} onClick={() => setNavChosen("Beef")}>
        Beef
      </div>
      <div className={`${navChosen === "Chicken" ? styles.chosen : ""}`} onClick={() => setNavChosen("Chicken")}>
        Chicken
      </div>
      <div className={`${navChosen === "Dessert" ? styles.chosen : ""}`} onClick={() => setNavChosen("Dessert")}>
        Dessert
      </div>
      <div className={`${navChosen === "Lamb" ? styles.chosen : ""}`} onClick={() => setNavChosen("Lamb")}>
        Lamb
      </div>
      <div className={`${navChosen === "Pasta" ? styles.chosen : ""}`} onClick={() => setNavChosen("Pasta")}>
        Pasta
      </div>
      <div className={`${navChosen === "Favorite" ? styles.chosen : ""}`} onClick={() => setNavChosen("Favorite")}>
        Favorite
      </div>
    </nav>
  )
}

export default Navigation;