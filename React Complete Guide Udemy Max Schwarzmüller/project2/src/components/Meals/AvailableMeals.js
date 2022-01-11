import styles from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import { useEffect, useState } from "react";

// const dummyMeals = [
//   // This is basically our Menu which is and should be static.
//   // But it should be fetched from a backend.
//   {
//     id: "m1",
//     name: "Sushi",
//     description: "Finest fish and veggies",
//     price: 22.99,
//   },
//   {
//     id: "m2",
//     name: "Schnitzel",
//     description: "A german specialty!",
//     price: 16.5,
//   },
//   {
//     id: "m3",
//     name: "Barbecue Burger",
//     description: "American, raw, meaty",
//     price: 12.99,
//   },
//   {
//     id: "m4",
//     name: "Green Bowl",
//     description: "Healthy...and green...",
//     price: 18.99,
//   },
// ];

const AvailaleMeals = () => {
  const [dummyMeals, setDummyMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  const fetchMeals = async () => {
    const res = await fetch(
      "https://react-http-course-499da-default-rtdb.asia-southeast1.firebasedatabase.app/meals"
    );

    if (!res.ok) {
      // suppose the response is not ok, ie it has some error.
      throw new Error("Something went wrong. :(");
      // ye string error object ke message mai stored hoga.
    }

    const data = await res.json();
    let loadedMeals = [];
    for (let key in data) {
      loadedMeals.push({ id: key, ...data[key] });
    }
    setDummyMeals(loadedMeals);
    setIsLoading(false);
    console.log(loadedMeals);
  };
  useEffect(() => {
    // VERY IMPORTANT -
    // below wont work, https://itnext.io/error-handling-with-async-await-in-js-26c3f20bc06a
    // yato fetchMeals ke call ko await karna padega jiske liye useEffect wala function async hona chahiye (which is NOT allowed) YA PHIR ek async function mai try catch ko wrap karlo aur phir usko useEffect mai wrap karlo YA PHIR simply promise handle karlo .catch() se. 
    // try {
    //   fetchMeals();
    // } catch (e) {
    //   setIsLoading(false);
    //   setHttpError(e.message);
    // }
    fetchMeals().catch((e) => {
        setIsLoading(false);
        setHttpError(e.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section className={styles.meals__loading}>
        <p>Loading...</p>
      </section>
    );
  }
  if (httpError) {
    return (
      <section className={styles.meals__error}>
        <p>{httpError}</p>
      </section>
    );
  }
  return (
    <section className={styles.meals}>
      <Card>
        <ul>
          {dummyMeals.map((meal) => {
            return (
              <MealItem
                name={meal.name}
                description={meal.description}
                price={meal.price}
                key={meal.id}
                id={meal.id}
              />
            );
          })}
        </ul>
      </Card>
    </section>
  );
};

export default AvailaleMeals;
