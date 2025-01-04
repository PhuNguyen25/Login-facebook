// src/Popup.js
import React, { useState } from 'react';

const Popup = () => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button onClick={togglePopup} style={popupButtonStyles}>
        Open Popup
      </button>

      {isOpen && (
        <div style={popupStyles}>
          <div style={popupHeader}>
            <button onClick={togglePopup} style={closeButtonStyles}>
              X
            </button>
            <h2>Popup Content</h2>
          </div>
          <div style={popupBody}>
            <p>This is the content inside the popup.</p>
            <p>You can put any content here.</p>
          </div>
        </div>
      )}
    </div>
  );
};

const popupButtonStyles = {
  position: 'fixed',
  bottom: '10px',
  right: '20px',
  backgroundColor: '#4CAF50',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  padding: '15px',
  fontSize: '16px',
  cursor: 'pointer',
  zIndex: 9999,
};

const popupStyles = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'white',
  border: '2px solid #ccc',
  borderRadius: '10px',
  width: '400px',
  padding: '20px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  zIndex: 9999,
};

const popupHeader = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const closeButtonStyles = {
  backgroundColor: 'transparent',
  border: 'none',
  fontSize: '20px',
  cursor: 'pointer',
};

const popupBody = {
  marginTop: '10px',
};

export default Popup;
