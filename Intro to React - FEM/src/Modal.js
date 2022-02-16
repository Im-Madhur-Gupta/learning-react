import {useEffect, useRef} from "react";
import {createPortal} from "react-dom";

const modalRoot = document.getElementById("modal");

// Modal doesn't care for what its going to render it just going to render whatever is passed into it, ie its children.
const Modal = ({children}) => {

    const elRef = useRef(null);
    // useRef() is throughly discussed in intermediate React by Brian sir.
    // useRef is a container for state, that you want to save past render cycles.
    // We only want 1 div inside elRef.current, we don't want to create a new div on every re-render, so, I want to preserve its state across/past render cycles. 
    if(!elRef.current){
        elRef.current = document.createElement("div");
    }

    useEffect(() => {
        modalRoot.appendChild(elRef.current); // id=modal wale me elRef.current wala div insert karwa diya.
        return () => modalRoot.removeChild(elRef.current); // ab jab function complete ho gaya to usse remove karwa diya.
    },[]);

    return createPortal(<div>{children}</div>, elRef.current);
}

export default Modal;