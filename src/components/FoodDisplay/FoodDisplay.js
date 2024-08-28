import { useSelector } from "react-redux";
import "./FoodDisplay.css";
import FoodItem from "../FoodItem/FoodItem";

const FoodDisplay = ({ category }) => {
  // Accessing food_list from Redux store
  const foodList = useSelector((state) => state.cart.food_list);

  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {foodList && foodList.length > 0 ? (
          foodList.map((item) => {
            if (category === "All" || category === item.category) {
              return (
                <FoodItem
                  key={item._id}
                  id={item._id}
                  name={item.name}
                  description={item.description}
                  price={item.price}
                  image={item.image}
                />
              );
            }
            return null; // Return null for items that don't match the category
          })
        ) : (
          <p>No dishes available</p>
        )}
      </div>
    </div>
  );
};

export default FoodDisplay;
