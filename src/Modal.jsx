import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Modal = ({ children }) => {
  const elRef = useRef(null);
  // doing it this way allows us to increase performance
  // if we put that createElement inside the ref, then the output would be created and then tossed away
  // refs are used for the EXACT SAME THING every single time
  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }

  useEffect(() => {
    // putting this in here makes the typescript happy!!!
    const modalRoot = document.getElementById("modal");
    modalRoot.appendChild(elRef.current);
    // the current issue, is that we need to be able to REMOVE the modal after a selection

    // ANYTHING you return is run RIGHT BEFORE the component gets unmounted
    return () => modalRoot.removeChild(elRef.current);
  }, []);

  return createPortal(<div>{children}</div>, elRef.current);
};

export default Modal;