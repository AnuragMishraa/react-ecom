// src/components/common/SidePanel.jsx
import React from 'react';
import PropTypes from 'prop-types';

const SidePanel = ({ isOpen, onClose, children }) => {
  return (
    <div className={`side-panel ${isOpen ? 'open' : ''}`}>
      <div className="side-panel-content">
        <button className="side-panel-close" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

SidePanel.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default SidePanel;
