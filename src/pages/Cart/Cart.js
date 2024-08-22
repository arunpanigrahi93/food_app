import React from "react";
import "./Cart.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart, removeFromCart } from "../../redux/cartSlice"; // Adjust path as needed

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const foodList = useSelector((state) => state.cart.food_list);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Calculate total amount
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      if (cartItems[itemId] > 0) {
        const item = foodList.find((product) => product._id === itemId);
        if (item) {
          totalAmount += item.price * cartItems[itemId];
        }
      }
    }
    return totalAmount;
  };

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {foodList.map((item) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={item._id}>
                <div className="cart-items-title cart-items-item">
                  <img src={item.image} alt={item.name} />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <div className="quantity-controls-vertical">
                    <button
                      onClick={() => dispatch(addToCart(item._id))}
                      className="quantity-button"
                    >
                      +
                    </button>
                    <p>{cartItems[item._id]}</p>
                    <button
                      onClick={() => dispatch(removeFromCart(item._id))}
                      className="quantity-button"
                    >
                      -
                    </button>
                  </div>
                  <p>${item.price * cartItems[item._id]}</p>
                  <p
                    onClick={() => dispatch(removeFromCart(item._id))}
                    className="cross"
                  >
                    x
                  </p>
                </div>
                <hr />
              </div>
            );
          }
          return null; // Ensure to handle cases where items are not in the cart
        })}
        <div className="cart-bottom">
          <div className="cart-total">
            <h2>Cart Totals</h2>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>${getTotalCartAmount()}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <b>Total</b>
                <b>
                  ${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}
                </b>
              </div>
            </div>
            <button onClick={() => navigate("/order")}>
              PROCEED TO CHECKOUT
            </button>
          </div>

          <div className="cart-promocode">
            <div>
              <p>If you have a promo code, Enter it here</p>
              <div className="cart-promocode-input">
                <input type="text" placeholder="promo code" />
                <button>Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
