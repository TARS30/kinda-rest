import styles from "./MealList.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem";
import { useCallback, useEffect, useState } from "react";


const MealList = () => {
  const [menu, setMenu] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  // const [httpErrorMessage, setHttpErrorMessage] = useState(false)
  
  const fetchMenuList = useCallback(async () => {
    setIsLoading(true)
    const response = await fetch(
      "https://test-a0949-default-rtdb.europe-west1.firebasedatabase.app/meals.json"
    );
    const data = await response.json();

    const menuList = [];

    for (const key in data) {
      menuList.push({
        id: key,
        name: data[key].name,
        price: data[key].price,
        description: data[key].description,
      });
    }
    setMenu(menuList);
    
    setIsLoading(false)

    // fetchMenuList().catch((err) => {
    //   setIsLoading(false)
    //   setHttpErrorMessage(err.message)
    // })
  }, []);
  useEffect(() => {
    fetchMenuList();
  }, [fetchMenuList]);

  if (isLoading) {
    return (
      <section>
        <p>Loading</p>
      </section>
    )
  }

  // if (httpErrorMessage) {
  //   return (
  //     <section>
  //       <p>Error</p>
  //     </section>
  //   )
  // }

  const mealItem = menu.map((item) => (
    <MealItem
    id={item.id}
      key={item.id}
      name={item.name}
      price={item.price}
      description={item.description}
    />
  ));
  return (
    <div className={styles.meals}>
      <Card>
        <ul>{mealItem}</ul>
      </Card>
    </div>
  );
};

export default MealList;
