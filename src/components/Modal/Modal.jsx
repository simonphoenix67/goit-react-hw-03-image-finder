import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

export const Modal = ({ url, onClose }) => {
  useEffect(() => {
    const clickEsc = (event) => {
      if (event.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', clickEsc);

    return () => {
      window.removeEventListener('keydown', clickEsc);
    };
  }, [onClose]);

  const clickBackdrop = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div onClick={clickBackdrop} className='Overlay'>
      <div className='Modal'>
        <img src={url} alt='' />
      </div>
    </div>
  );
};

Modal.propTypes = {
  url: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
