export type InputAmount = {
  id: string;
  type: string;
  min: string;
  max: string;
  step: string;
  defaultValue: string;
};

export type PropsOnClose = {
  children?: React.ReactNode;
  onClose?: () => {};
};
