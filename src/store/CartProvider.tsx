import { useReducer } from "react";

import CartContext from "./cart-context";

import { PropsOnClose } from "../types/GereralTypes";
import { CartItemType } from "../types/CartTypes";

const defaultCartState = {
  items: [] as CartItemType[],
  totalAmount: 0,
};

const cartReducer = (
  state: { items: CartItemType[]; totalAmount: number },
  action: { type: string; item: CartItemType; id: string }
) => {
  if (action.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const existingCartItemIndex = state.items.findIndex(
      (item: CartItemType) => item.id === action.item.id
    );
    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === "REMOVE") {
    const existingCartItemIndex = state.items.findIndex(
      (item: CartItemType) => item.id === action.id
    );
    const existingItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    let updatedItems;
    if (existingItem.amount === 1) {
      updatedItems = state.items.filter(
        (item: CartItemType) => item.id !== action.id
      );
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === "CLEAR") {
    return defaultCartState;
  }

  return defaultCartState;
};

const CartProvider: React.FC<PropsOnClose> = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item: CartItemType) => {
    const actionType = {
      ...{ type: "", item: {} as CartItemType, id: "" },
      ...{ type: "ADD", item: item },
    };
    dispatchCartAction(actionType);
  };

  const removeItemFromCartHandler = (id: string) => {
    const actionType = {
      ...{ type: "", item: {} as CartItemType, id: "" },
      ...{ type: "REMOVE", id: id },
    };
    dispatchCartAction(actionType);
  };

  const clearCartHandler = () => {
    const actionType = {
      ...{ type: "", item: {} as CartItemType, id: "" },
      ...{ type: "CLEAR" },
    };
    dispatchCartAction(actionType);
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart: clearCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
