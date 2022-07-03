import { useRef, useState } from "react";

import { PropsCheckout } from "../../types/CheckoutTypes";

import classes from "./Checkout.module.css";

const isEmpty = (value: string) => value.trim() === "";
const isFiveChars = (value: string) => value.trim().length === 5;

const Checkout = (props: PropsCheckout) => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    postalCode: true,
    city: true,
  });

  const nameInputRef = useRef<HTMLInputElement>(null);
  const streetInputRef = useRef<HTMLInputElement>(null);
  const postalInputRef = useRef<HTMLInputElement>(null);
  const cityInputRef = useRef<HTMLInputElement>(null);

  const confirmHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const enteredName = nameInputRef.current?.value || "";
    const enteredStreet = streetInputRef.current?.value || "";
    const enteredPostal = postalInputRef.current?.value || "";
    const enteredCity = cityInputRef.current?.value || "";

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredPostalIsValid = isFiveChars(enteredPostal);
    const enteredCityIsValid = !isEmpty(enteredCity);

    setFormInputsValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      postalCode: enteredPostalIsValid,
      city: enteredCityIsValid,
    });

    const formIsValid =
      enteredName &&
      enteredStreetIsValid &&
      enteredPostalIsValid &&
      enteredCityIsValid;

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      postalCode: enteredPostal,
      city: enteredCity,
    });
  };

  const addInvalidClass = (value: boolean) => {
    return value ? "" : classes.invalid;
  };

  const nameControlClasses = `${classes.control} ${addInvalidClass(
    formInputsValidity.name
  )}`;

  const streetControlClasses = `${classes.control} ${addInvalidClass(
    formInputsValidity.street
  )}`;

  const postalControlClasses = `${classes.control} ${addInvalidClass(
    formInputsValidity.postalCode
  )}`;

  const cityControlClasses = `${classes.control} ${addInvalidClass(
    formInputsValidity.city
  )}`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Your Name</label>
        <input ref={nameInputRef} type="text" id="name" />
        {!formInputsValidity.name && <p>Please enter a valid name.</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor="street">Street</label>
        <input ref={streetInputRef} type="text" id="street" />
        {!formInputsValidity.street && <p>Please enter a valid street.</p>}
      </div>
      <div className={postalControlClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input ref={postalInputRef} type="text" id="postal" />
        {!formInputsValidity.postalCode && (
          <p>Please enter a valid postal code.</p>
        )}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor="city">City</label>
        <input ref={cityInputRef} type="text" id="city" />
        {!formInputsValidity.city && <p>Please enter a valid city.</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
