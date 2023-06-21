import styles from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import CartContext from '../../store/Cart-Context'
import { useContext } from "react";
const MealItem = (props) => {
  const cartContext = useContext(CartContext);

  const formattedPrice = `$${props.price.toFixed(2)}`;

  const addToCartHandler = (amount) => {
    cartContext.addItem({
      id: props.id,
      amount: amount,
      name: props.name,
      price: props.price,
    });
  };
  return (
    <li className={styles.meal}>
      <div>
        <h3>{props.name}</h3>
        <p className={styles.description}>{props.description}</p>
        <p className={styles.price}>{formattedPrice}</p>
      </div>
      <div>
        <MealItemForm onAddToCart={addToCartHandler} id={props.id} />
      </div>
    </li>
  );
};

export default MealItem;
