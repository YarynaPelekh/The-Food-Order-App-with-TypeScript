export type Props = {
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
