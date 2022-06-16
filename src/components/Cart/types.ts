export type itemDescription = {
  name: string;
  amount: number;
  price: number;
};

export type PropsCheckout = {
  onConfirm: (data: checkoutInfo) => {};
  onCancel: () => {};
};

export type checkoutInfo = {
  name: string;
  street: string;
  postalCode: string;
  city: string;
};

export type CartProps = {
  onClose: () => {};
};

export type CartItemType = {
  id: string;
  item: itemDescription;
};

export type CartItemProps = {
  item: itemDescription;
  onRemove: () => void;
  onAdd: () => void;
};
