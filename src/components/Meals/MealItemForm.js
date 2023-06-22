import styles from "./MealItemForm.module.css";
import Input from "../UI/Input";
import { useRef, useState } from "react";

const MealItemForm = (props) => {
  const [isAmountValid, setIsAmountValid] = useState(true);

  const amountInputRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    const inputAmount = amountInputRef.current.value;
    if (
      inputAmount.trim().length === 0 ||
      +inputAmount < 1 ||
      +inputAmount > 10
    ) {
      setIsAmountValid(false);
      return;
    }
    props.onAddToCart(+inputAmount);
  };

  return (
    <form onSubmit={submitHandler} className={styles.form}>
      <Input
        ref={amountInputRef}
        label="Quantity"
        input={{
          id: props.id,
          type: "number",
          min: "1",
          step: "1",
          defaultValue: "1",
        }}
      />
      {!isAmountValid && <p>Between 1 - 10!</p>}
      <button>Add</button>
    </form>
  );
};

export default MealItemForm;
