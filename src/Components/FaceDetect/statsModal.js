import React from 'react';
import './statsModal.css';

const StatsModal = ({ isOpen, stats }) => {
  return isOpen ? (
    <div className="modal">
      <div className="modalPosition">
        <div className="closeButton" onClick={close('')}>
          X
        </div>
        <div className="modalContact"></div>
      </div>
    </div>
  ) : null;
};

export default StatsModal;
