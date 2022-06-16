export type PropsCheckout = {
  children?: React.ReactNode;
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
  children?: React.ReactNode;
  onClose: () => {};
};

export type CartItemType = {
  id: string;
  name: string;
  amount: number;
  price: number;
};
