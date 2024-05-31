import { useSelector, useDispatch } from 'react-redux';
import { hideModal, showModal } from '../../store/modals';
import Modal from '../Modal/Modal';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import './SessionModal.css';

function SessionModal() {
  const dispatch = useDispatch();
  const modalType = useSelector((state) => state.modals.type);
  const sessionUser = useSelector((state) => state.session.user);

  if (!modalType || sessionUser) return null;

  const onClose = () => dispatch(hideModal());

  const handleOverlayClick = () => onClose();

  return (
    <>
      <div className='overlay' onClick={handleOverlayClick}></div>
      <Modal onClose={onClose}>
        <div className="session-modal">
          <div id='line'>
            <button id="close-button" onClick={onClose}>
              &times;
            </button>
            <h2>{modalType === 'login' ? 'Log In ' : 'SignUp'}</h2>
          </div>
          {modalType === 'login' ? <LoginForm /> : <SignupForm />}
          <button
            className="link"
            onClick={() =>
              dispatch(showModal(modalType === 'login' ? 'signup' : 'login'))
            }
          >
            {modalType === 'login' ? 'Sign up' : 'Log in'} instead
          </button>
        </div>
      </Modal>
    </>
  );
}

export default SessionModal;
