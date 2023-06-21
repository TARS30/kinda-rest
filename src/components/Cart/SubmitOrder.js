import { useRef, useState } from "react";
import styles from "./SubmitOrder.module.css";

const SubmitOrder = (props) => {
  const [formValidity, setFormValidity] = useState({
    name: true,
    city: true,
    street: true,
  });

  const nameInputRef = useRef();
  const cityInputRef = useRef();
  const streetInputRef = useRef();

  const isInputValid = (inputValue) => inputValue.trim().length > 1;

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredCity = cityInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;

    const isEnteredNameValid = isInputValid(enteredName);
    const isEnteredCityValid = isInputValid(enteredCity);
    const isEnteredStreetValid = isInputValid(enteredStreet);

    setFormValidity({
      name: isEnteredNameValid,
      city: isEnteredCityValid,
      street: isEnteredStreetValid,
    });

    const isFormValid =
      isEnteredNameValid && isEnteredCityValid && isEnteredStreetValid;

    if (!isFormValid) {
      return;
    }

    props.onSubmit({
      name: enteredName,
      city: enteredCity,
      street: enteredStreet,
    });

    console.log(
      enteredName,
      enteredCity,
      enteredStreet,
      props.totalAmount,
      props.cartItems
    );
  };

  return (
    <form onSubmit={formSubmitHandler} className={styles.form}>
      <div
        className={`${styles.control} ${
          formValidity.name ? "" : styles.invalid
        }`}
      >
        <label htmlFor="name">Enter name</label>
        <input ref={nameInputRef} type="text" id="name" />
        {!formValidity.name && <p>Enter Name</p>}
      </div>
      <div
        className={`${styles.control} ${
          formValidity.city ? "" : styles.invalid
        }`}
      >
        <label htmlFor="city">Enter city</label>
        <input ref={cityInputRef} type="text" id="city" />
        {!formValidity.city && <p>Enter City</p>}
      </div>
      <div
        className={`${styles.control} ${
          formValidity.street ? "" : styles.invalid
        }`}
      >
        <label htmlFor="street">Enter street</label>
        <input ref={streetInputRef} type="text" id="street" />
        {!formValidity.street && <p>Enter Street</p>}
      </div>
      <div className={styles.actions}>
        <button onClick={props.onClose} type="button">
          Cancel
        </button>
        <button type="submit">Confirm</button>
      </div>
    </form>
  );
};

export default SubmitOrder;
