import { useEffect, useRef, MutableRefObject, ReactElement } from "react";
import { createPortal } from "react-dom";

const Modal = ({ children }: { children: ReactElement }) => {
  const elRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }

  useEffect(() => {
    const modalRoot = document.getElementById("modal");
    if(!modalRoot || !elRef.current){
      // writing this in is forcing modalRoot to not be null AND elRef.current is also not NULL
      return;
    }
    modalRoot.appendChild(elRef.current);
    return () => {
      // if there's a elRef.current, then REMOVE IT!!! can't remove what you don't have
      if(elRef.current) modalRoot.removeChild(elRef.current);
    }
  }, []);

  return createPortal(
    <div className="fixed left-0 top-0 bottom-0 right-0 z-10 flex justify-center bg-black/80 text-center">
      {children}
    </div>,
    elRef.current
  );
};

export default Modal;
