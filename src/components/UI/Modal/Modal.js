import React from "react";
import classes from "./Modal.module.scss";
import Backdrop from "../Backdrop/Backdrop";

const Modal = (props) => {
  return (
    <>
      <Backdrop show={props.show} clicked={props.modalClosed} />
      <div
        className={props.noBackground ? classes.NoBackground : classes.Modal}
        style={{
          transform: props.show
            ? `${props.noBackground ? "translate(-50%,-50%)" : "translateY(0)"}`
            : `${
                props.noBackground
                  ? "translate(-50%,-100vh)"
                  : "translateY(-100vh)"
              }`,
          opacity: props.show ? "1" : "0",
          zIndex: props.show ? "500" : "-1",
        }}
      >
        {props.children}
      </div>
    </>
  );
};

export default Modal;
// position: absolute;
// top: 50%;
// right: 50%;
// transform: translate(50%, -50%);
