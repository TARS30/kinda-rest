import {  useState } from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartContextProvider from "./store/CartContextProvider";



function App() {
  const [cartIsVisible, setCartIsVisible] = useState(false)

  const closeCartHandler = () => {
    setCartIsVisible(false)
  }

  const showCartHandler = () => {
    setCartIsVisible(true);
  }

  return (
    <CartContextProvider>
      {cartIsVisible && <Cart onCloseCartHandler={closeCartHandler} />}
      <Header onShowCartHandler={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartContextProvider>
  );
}

export default App;
