import React from "react";

import { InputAmount } from "../../types/GereralTypes";

import classes from "./Input.module.css";

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
