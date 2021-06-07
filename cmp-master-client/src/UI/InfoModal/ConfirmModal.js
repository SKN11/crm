import React from 'react';

import './ConfirmModal.css';
import Button from '../Button/Button'

const ConfirmModal = React.memo(props => {
  return (
    <React.Fragment>
      <div className="backdrop" onClick={props.onClose} />
      <div className="confirm-modal">
        <h2>User Confirmation</h2>
        <p>{props.children}</p>
        <div className="confirm-modal__actions">
          <Button clicked={props.clickConfirm} btnType={'Success'}>Confirm</Button>
          <Button clicked={props.clickCancel} btnType={'Danger'}>Cancel</Button>
          
        </div>
      </div>
    </React.Fragment>
  );
});

export default ConfirmModal;
