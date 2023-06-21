import { Fragment } from "react";

import image from '../../assets/sushi - Copy.jpg'
import styles from './Header.module.css'
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
  return (
    <Fragment>
      <header className={styles.header}>
        <h1>FOOD</h1>
        <HeaderCartButton onShowCartHandler={props.onShowCartHandler} />
      </header>
      <div className={styles["main-image"]}>
        <img src={image} alt="awdawd" />
      </div>
    </Fragment>
  );
};

export default Header;
