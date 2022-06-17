export type checkoutInfo = {
  name: string;
  street: string;
  postalCode: string;
  city: string;
};

export type PropsCheckout = {
  onConfirm: (data: checkoutInfo) => {};
  onCancel: () => {};
};

export type CartItemType = {
  id: string;
  name: string;
  amount: number;
  price: number;
};

export type MealItemType = {
  id: string;
  name: string;
  description: string;
  price: number;
};

export type CartProps = {
  onClose: () => {};
};

export type CartItemProps = {
  item: CartItemType;
  onRemove: () => void;
  onAdd: () => void;
};
