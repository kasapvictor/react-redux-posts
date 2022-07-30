import React, { useEffect, useState } from 'react';
import cn from 'classnames';

import { disableScroll, enableScroll } from '../../utils';

import { Schedule as ScheduleForm } from '../Form';

export const Schedule = ({ currentObject, handleClose, status, sendTo }) => {
  const { address, cityName, countyName, zipcode } = currentObject;
  const [isActiveModal, setIsActiveModal] = useState(false);
  const addressForMessage = `${address}, ${cityName} ${countyName} ${zipcode}`;

  useEffect(() => {
    setIsActiveModal(true);
    disableScroll();
  }, []);

  const handleModalClose = () => {
    setIsActiveModal(false);
    enableScroll();

    setTimeout(() => {
      handleClose();
    }, 500);
  };

  const statusIsActive = status === 'active';

  const modalClass = cn('idx_modal', {
    'idx_modal--active': isActiveModal,
  });

  const statusClass = cn('modal__status', {
    'modal__status--inactive': !statusIsActive,
    'modal__status--active': statusIsActive,
  });

  return (
    <div className={modalClass}>
      <div className="modal modal-schedule">
        <div className="modal__inner">
          <div className="modal__container modal__container-schedule" role="dialog" aria-modal="true">
            <div className="modal__details">
              <div className="modal__header">
                <div className={statusClass}>
                  <span className="modal__status-text">{status}</span>
                </div>
                <button className="modal__close" aria-label="Close modal" onClick={handleModalClose}></button>
              </div>

              <div className="modal__content">
                <div className="modal__content-center">
                  <ScheduleForm sendTo={sendTo} address={addressForMessage} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="modal__overlay" aria-label="Close modal" onClick={handleModalClose}></div>
      </div>
    </div>
  );
};
