import styles from './styles.module.css'
const Categories = ({categories, currentCategory, setCurrentCategory}) => {
  return (
    <div className={styles.categories}>
      {categories.map(category => {
        const formattedCategory = category[0].toUpperCase() + category.slice(1)
        return (
          <button onClick={() => setCurrentCategory(category)} className={currentCategory === category? styles.active: styles.item} key={category}>
            {formattedCategory}
          </button>
        )
      })}
    </div>
  )
}

export default Categories