import React, { Fragment } from "react";
import styles from "./Modal.module.css";
import ReactDOM  from "react-dom";

const Backdrop = (props) => {
  return (
    <div onClick={props.onCloseCartHandler} className={styles.backdrop}></div>
  );
};

const ModalWindow = (props) => {
  return (
    <div className={styles.modal}>
      <div className={styles.content}>{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById("overlays");

const Modal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onCloseCartHandler={props.onCloseCartHandler} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalWindow>{props.children}</ModalWindow>,
        portalElement
      )}
    </Fragment>
  );
};

export default Modal;
