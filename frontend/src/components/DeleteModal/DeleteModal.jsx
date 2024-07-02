import React from 'react';
import './DeleteModal.css';

const DeleteModal = ({ onConfirm, onCancel }) => {
  return (
    <div className="delete-confirmation-modal">
      <p>Are you sure you want to delete this reservation?</p>
      <div className="actions">
        <button onClick={onConfirm}>Yes</button>
        <button onClick={onCancel}>No</button>
      </div>
    </div>
  );
};

export default DeleteModal;