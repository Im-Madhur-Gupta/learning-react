import ReactDOM from "react-dom";
import styles from "./Modal.module.css";

const ModalOverlay = (props) => {
  return (
    <>
      <div className={styles.backdrop} onClick={props.hideCartHandler}></div>
      <div className={styles.modal}>
        <div className={styles.content}>{props.children}</div>
      </div>
    </>
  );
};

const Modal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <ModalOverlay hideCartHandler={props.hideCartHandler}>
          {props.children}
        </ModalOverlay>,
        document.getElementById("modal--root")
      )}
    </>
  );
};

export default Modal;
