import React from "react";
import "./PlaceOrder.css";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const PlaceOrder = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const foodList = useSelector((state) => state.cart.food_list);

  // Function to calculate the total cart amount
  const getTotalCartAmount = () => {
    return Object.keys(cartItems).reduce((total, itemId) => {
      const itemInfo = foodList.find((product) => product._id === itemId);
      return total + itemInfo.price * cartItems[itemId];
    }, 0);
  };

  const location = useLocation();
  const originalTotal = getTotalCartAmount() + 2;
  const totalAfterDiscount = location.state?.total || originalTotal;
  const discount = originalTotal - totalAfterDiscount;

  return (
    <form className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input type="text" placeholder="First name" />
          <input type="text" placeholder="Last name" />
        </div>
        <input type="email" placeholder="Email address" />
        <input type="text" placeholder="Street" />
        <div className="multi-fields">
          <input type="text" placeholder="City" />
          <input type="text" placeholder="State" />
        </div>
        <div className="multi-fields">
          <input type="text" placeholder="Zip code" />
          <input type="text" placeholder="Country" />
        </div>
        <input type="text" placeholder="Phone" />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${(originalTotal - 2).toFixed(2)}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Discount</p>
              <p>-${discount.toFixed(2)}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${originalTotal === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${totalAfterDiscount.toFixed(2)}</b>
            </div>
          </div>
          <button>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
