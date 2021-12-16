import ReactDOM from "react-dom";
import "./ErrorModal.scss";

const ErrorModal = ({ displayText, setShowModal }) => {
  const ModalOverlay = ({ displayText, setShowModal }) => (
    <div
      className="modal"
      // Backdrop pe click karne pe modal close ho jae.
      onClick={() => {
        setShowModal(false);
      }}
    >
      {/* Ye jo outer modal container he wo backdrop ke liye he, ye div ye bhi make sure karega ki jo baki elements he wo inaccesible ho jae. */}
      <div
        className="modal__container"
        // Maine aisa set kiya tha ki backdrop wala parent div me koi click kare to modal band ho jae. Kyoki ye parent div modal__container ko contain karta he to modal__conatiner ko click karne par bhi modal close ho raha tha which I didnt want to maine modal__container ke onClick event me stopPropogation() kar diya event ka.
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <p className="modal__container__text">{displayText}</p>
        <button
          className="modal__container__button"
          onClick={() => {
            setShowModal(false);
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
  return (
    <>
      {ReactDOM.createPortal(
        <ModalOverlay displayText={displayText} setShowModal={setShowModal} />,
        document.getElementById("modal__root")
      )}
      {/* ReactDOM.createPortal(
        Kya render karna he is Portal me uska JSX,
        kaha render karna he DOM me);
        
        2nd argument mai apn index.html inside of public folder me jakar ek div (any element) bana dete he jo react ke id="root" wale element se upar hota he, aur isme mai apna protal render kar wata hu, ye semantically sahi he.
        */}
    </>
  );
};

export default ErrorModal;
