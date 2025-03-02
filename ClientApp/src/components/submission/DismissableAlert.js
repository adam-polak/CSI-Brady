import React, { useState } from 'react';
import { Alert } from 'reactstrap';

function DismissableAlert({ children, visible, onDismiss }) {

  const handleOnDismiss = () => onDismiss();

  return (
    <Alert color="info" isOpen={visible} toggle={handleOnDismiss}>
      {children}
    </Alert>
  );
}

export default DismissableAlert;