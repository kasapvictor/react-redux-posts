import React from 'react';

import { Details } from './Details';
import { Schedule } from './Schedule';

const ModalComponent = ({ type, ...props }) => {
  const modal = {
    details: <Details {...props} />,
    schedule: <Schedule {...props} />,
  };

  return modal[type];
};

export const Modal = ({ type, currentObject, handleClose, status, sendTo }) => (
  <ModalComponent type={type} currentObject={currentObject} handleClose={handleClose} status={status} sendTo={sendTo} />
);
