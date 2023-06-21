import Modal from "../UI/Modal";
import styles from "./Cart.module.css";
import { Fragment, useContext, useState } from "react";
import CartContext from "../../store/Cart-Context";
import CartItem from "./CartItem";
import SubmitOrder from "./SubmitOrder";

const Cart = (props) => {
  const cartContext = useContext(CartContext);
  const [isOrderVisible, setIsOrderVisible] = useState(false);
  const [isDataSubmitting, setIsDataSubmitting] = useState(false);
  const [wasDataSendingSuccessful, setWasDataSendingSuccessful] =
    useState(false);
  const totalAmount = `$${Math.abs(cartContext.totalAmount).toFixed(2)}`;
  const hasItems = cartContext.items.length > 0;

  const removeCartItemHandler = (id) => {
    cartContext.removeItem(id);
  };

  const addCartItemHandler = (item) => {
    cartContext.addItem({ ...item, amount: 1 });
  };

  const clearCartHandler = () => {
    cartContext.clearCart();
  };

  const orderVisibilityHandler = () => {
    setIsOrderVisible(true);
  };

  const submitOrderHandler = async (userData) => {
    setIsDataSubmitting(true);
    await fetch(
      "https://test-a0949-default-rtdb.europe-west1.firebasedatabase.app/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          totalPrice: totalAmount,
          orderedMeals: cartContext.items,
        }),
      }
    );
    setIsDataSubmitting(false);
    setWasDataSendingSuccessful(true);
    clearCartHandler();
  };

  const cancelOrderHandler = () => {
    setIsOrderVisible(false);
  };

  const cartItems = (
    <ul className={styles["cart-items"]}>
      {cartContext.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          price={item.price}
          amount={item.amount}
          onAdd={addCartItemHandler.bind(null, item)}
          onRemove={removeCartItemHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  );

  const CartModalContent = (
    <Fragment>
      {cartItems}
      <div className={styles.total}>
        <span>Total</span>
        <span>{totalAmount}</span>
      </div>
      {!isOrderVisible && (
        <div className={styles.actions}>
          <button
            onClick={props.onCloseCartHandler}
            className={styles["button--alt"]}
          >
            Close
          </button>
          {hasItems && (
            <button
              type="button"
              onClick={orderVisibilityHandler}
              className={styles.button}
            >
              Order!!
            </button>
          )}
        </div>
      )}
      {isOrderVisible && (
        <SubmitOrder
          onSubmit={submitOrderHandler}
          totalAmount={totalAmount}
          onClose={cancelOrderHandler}
        />
      )}
    </Fragment>
  );

  const DataSubmittingModalContent = (
    <p className={styles.submitting}>Uploading Order</p>
  );

  const dataWasSubmittedCartModalContent = (
    <div className={styles.actions}>
      <p className={styles.submitting}>Order Uploaded</p>
      <button onClick={props.onCloseCartHandler}>Confirm</button>
    </div>
  );

  return (
    <Modal onCloseCartHandler={props.onCloseCartHandler}>
      {!isDataSubmitting && !wasDataSendingSuccessful && CartModalContent}
      {isDataSubmitting && DataSubmittingModalContent}
      {wasDataSendingSuccessful && dataWasSubmittedCartModalContent}
    </Modal>
  );
};

export default Cart;
