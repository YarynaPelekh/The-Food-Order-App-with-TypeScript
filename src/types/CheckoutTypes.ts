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
