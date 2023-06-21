import { useContext, useEffect, useState } from "react";
import CartContext from "../../store/Cart-Context";
import styles from "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon";

const HeaderCartButton = (props) => {
  const [buttonIsAnimated, setButtonIsAnimated] = useState(false);

  const cartContext = useContext(CartContext);

  const cartItemsNumber = cartContext.items.reduce((currentValue, item) => {
    return (currentValue += item.amount);
  }, 0);

  const buttonClasses = `${styles.button} ${
    buttonIsAnimated ? styles.bump : ""
  }`;

  useEffect(() => {
    if (cartContext.items.length === 0) {
      return;
    }
    setButtonIsAnimated(true);

    const timer = setTimeout(() => {
      setButtonIsAnimated(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [cartContext.items]);
  return (
    <button
      onClick={props.onShowCartHandler}
      className={buttonClasses}
      type={props.type || "button"}
    >
      {props.title}
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Cart</span>
      <span className={styles.badge}>{cartItemsNumber}</span>
    </button>
  );
};

export default HeaderCartButton;
