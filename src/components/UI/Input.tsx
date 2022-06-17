import React from "react";

import classes from "./Input.module.css";

import { InputAmount } from "../../types/types";

const Input = React.forwardRef<
  HTMLInputElement,
  { input: InputAmount; label: string }
>((props, ref) => {
  return (
    <div className={classes.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input ref={ref} {...props.input} />
    </div>
  );
});

export default Input;
