import React from "react";

import { CartItemType } from "../types/CartTypes";

const CartContext = React.createContext({
  items: [] as CartItemType[],
  totalAmount: 0,
  addItem: (item: CartItemType) => {},
  removeItem: (id: string) => {},
  clearCart: () => {},
});

export default CartContext;
