import './Modal.css';

function Modal({ children, onClose }) {
  return (
    <div id="modal">
      <div id="modal-background" onClick={onClose} />
      <div id="modal-content">
        {children}
      </div>
    </div>
  );
}

export default Modal;