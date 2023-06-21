import { Fragment } from "react";
import MealList from "./MealList";
import PromoText from "./PromoText";

const Meals = () => {
  return (
    <Fragment>
      <PromoText />
      <MealList />
    </Fragment>
  );
};

export default Meals;
