import React, { useContext, useState } from "react";

import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

import CartContext from "../../store/cart-context";

import { CartProps, CartItemType } from "../../types/CartTypes";
import { checkoutInfo } from "../../types/CheckoutTypes";

import classes from "./Cart.module.css";

const Cart = (props: CartProps) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const [isFetchingError, setIsFetchingError] = useState(false);

  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id: string) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item: CartItemType) => {
    cartCtx.addItem(item);
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const submitOrderHandler = async (userData: checkoutInfo) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("https://react-http-6d70b-default-rtdb.firebaseio.com/orders.json", {
        method: "POST",
        body: JSON.stringify({ user: userData, orderedItems: cartCtx.items }),
      });
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
    } catch {
      setIsFetchingError(true);
    }

    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item: CartItemType) => (
        <CartItem
          key={item.id}
          item={{
            id: item.id,
            name: item.name,
            amount: item.amount,
            price: item.price,
          }}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, { ...item, amount: +1 })}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        {" "}
        Close{" "}
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />}
      {!isCheckout && modalActions}
    </React.Fragment>
  );
  const isSubmittingModalContent = <p>Sending order data....</p>;
  const didSubmitModalContent = (
    <React.Fragment>
      {isFetchingError && (
        <section className={classes.carterror}>
          <p>"Something went wrong!"</p>
        </section>
      )}

      {!isFetchingError && <p>Succeefully send the order!</p>}

      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </React.Fragment>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
