export type CartProps = {
  onClose: () => {};
};

export type CartItemProps = {
  item: CartItemType;
  onRemove: () => void;
  onAdd: () => void;
};

export type CartItemType = {
  id: string;
  name: string;
  amount: number;
  price: number;
};
