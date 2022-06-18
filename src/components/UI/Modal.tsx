import { Fragment } from "react";
import ReactDOM from "react-dom";

import classes from "./Modal.module.css";

// import { Props, OnCloseType, PropsOnClose } from "../../types/types";
import { PropsOnClose } from "../../types/types";

const Backdrop: React.FC<PropsOnClose> = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose} />;
};

const ModalOverlay: React.FC<PropsOnClose> = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById("overlays") as HTMLElement;

// const Modal: React.FC<{ props: Props; onClose: () => {} }> = (
//   props,
//   onClose
const Modal: React.FC<PropsOnClose> = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};

export default Modal;
