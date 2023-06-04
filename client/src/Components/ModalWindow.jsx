import React from 'react';
import Modal from 'react-modal';
import styles from '../styles/modules/modal.module.scss'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    width: '280px',
    border: '3px solid gray' ,
    transform: 'translate(-50%, -50%)',
  },

  overlay: {
    zIndex: 555
  }
};

Modal.setAppElement(document.getElementById('root'));

const ModalWindow = ( {modalIsOpen, setIsOpen, text, onClickYes} ) => {

  function confirm() {
    onClickYes()
    setIsOpen(false);
  }

  function closeModal() {
    setIsOpen(false);
  }


  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Modal"
    >
      <p className={styles.text}>Вы действительно хотите {text}</p>
      <button className={styles.yes} onClick={confirm}>Да</button>
      <button className={styles.no} onClick={closeModal}>Нет</button>

    </Modal>
  );
};

export default ModalWindow;