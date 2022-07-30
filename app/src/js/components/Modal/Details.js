import React, { useEffect, useState } from 'react';
import cn from 'classnames';

import { formatPrice, formatSqftNum, calcPriceMonth, disableScroll, enableScroll } from '../../utils';
import { ArrowSmall, Build, Flake, Lot, Parking } from '../../icons';

import { Message as MessageForm, Schedule as ScheduleForm } from '../Form';

import { Feature, Specific } from './components';

export const Details = ({ currentObject, handleClose, status, sendTo }) => {
  const {
    image: images,
    advanced,
    address,
    cityName,
    countyName,
    zipcode,
    soldPrice,
    price,
    sqFt,
    bedrooms,
    fullBaths,
    yearBuilt,
    idxPropType,
  } = currentObject;
  const { cool, parking, lotsize } = advanced;
  const [isActiveModal, setIsActiveModal] = useState(false);
  const [isActiveContentLeft, setIsActiveContentLeft] = useState(false);
  const [isActiveContentRight, setIsActiveContentRight] = useState(false);
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

  const handleOpenMessage = () => {
    setIsActiveContentLeft(true);
  };

  const handleCloseMessage = () => {
    setIsActiveContentLeft(false);
  };

  const handleOpenScheduleViewing = () => {
    setIsActiveContentRight(true);
  };

  const handleCloseScheduleViewing = () => {
    setIsActiveContentRight(false);
  };

  const statusIsActive = status === 'active';

  const modalClass = cn('idx_modal', {
    'idx_modal--active': isActiveModal,
  });

  const statusClass = cn('modal__status', {
    'modal__status--inactive': !statusIsActive,
    'modal__status--active': statusIsActive,
  });

  const MessageClass = cn('modal__content-left', {
    'modal__content-left--active': isActiveContentLeft,
  });

  const ScheduleViewingClass = cn('modal__content-right', {
    'modal__content-right--active': isActiveContentRight,
  });

  const imagesUrls = Object.values(images)
    .filter((item) => typeof item !== 'number')
    .map(({ url }) => url);

  const imgClass = (count) =>
    cn('idx__img idx__gallery-item', {
      'idx__gallery-item--full': count % 3 === 0,
    });

  const features = (featuresList) => {
    if (featuresList.length === 0) {
      return '-';
    }

    return featuresList.map((item, idx) => <span key={idx}>{item}</span>);
  };

  return (
    <div className={modalClass}>
      <div className="modal">
        <div className="modal__inner">
          <div className="modal__container" role="dialog" aria-modal="true">
            <div className="modal__gallery">
              {imagesUrls.map((url, idx) => (
                <img key={idx} className={imgClass(idx)} src={url} alt="preview" />
              ))}
            </div>
            <div className="modal__details">
              <div className="modal__header">
                <div className={statusClass}>
                  <span className="modal__status-text">{status}</span>
                </div>
                <button className="modal__close" aria-label="Close modal" onClick={handleModalClose}></button>
              </div>

              <div className="modal__content">
                {statusIsActive && (
                  <div className={MessageClass}>
                    <div className="modal__content-header">
                      <button className="idx__button idx__button-square" onClick={handleCloseMessage}>
                        <span className="idx__button-icon idx__button-square-icon">
                          <ArrowSmall />
                        </span>
                      </button>
                    </div>
                    <MessageForm sendTo={sendTo} address={addressForMessage} />
                  </div>
                )}

                <div className="modal__content-center">
                  <div className="modal__row">
                    <div className="modal__amount">
                      <span className="modal__amount-price">{formatPrice(soldPrice || price)}</span>
                      <span className="modal__small modal__color--mute">${formatSqftNum(price, sqFt)}/sqft</span>
                    </div>
                    <div className="modal__monthly">
                      <span className="modal__monthly-price modal__text--bold">
                        {formatPrice(calcPriceMonth(price))}/mo
                      </span>
                      <span className="modal__small modal__color--mute">Est. payment</span>
                    </div>
                  </div>

                  <Specific sqFt={sqFt} bedrooms={bedrooms} fullBaths={fullBaths} />

                  <div className="modal__row">
                    <div className="modal__address">
                      <p className="modal__address-text">
                        {address}, {cityName}, {countyName} {zipcode}
                      </p>
                      <span className="modal__smaller modal__color--mute">Built in {yearBuilt}</span>
                    </div>
                  </div>

                  {statusIsActive && (
                    <div className="modal__buttons">
                      <button className="idx__button" onClick={handleOpenMessage}>
                        <span className="idx__button-text">Message</span>
                      </button>

                      <button className="idx__button idx__button--active" onClick={handleOpenScheduleViewing}>
                        <span className="idx__button-text">Schedule Viewing</span>
                      </button>
                    </div>
                  )}

                  <div className="modal__row">
                    <div className="modal__features">
                      <h2 className="modal__features-title">Features</h2>
                      <div className="modal__features-items">
                        <Feature icon={<Build />} type="Type" content={idxPropType} />

                        <Feature icon={<Flake />} type="Cooling" content={cool ? features(cool) : '-'} />

                        <Feature icon={<Parking />} type="Parking" content={parking ? features(parking) : '-'} />

                        <Feature icon={<Lot />} type="Lot" content={lotsize ? features(lotsize) : '-'} />
                      </div>
                    </div>
                  </div>
                </div>

                {statusIsActive && (
                  <div className={ScheduleViewingClass}>
                    <div className="modal__content-header">
                      <button className="idx__button idx__button-square" onClick={handleCloseScheduleViewing}>
                        <span className="idx__button-icon idx__button-square-icon">
                          <ArrowSmall />
                        </span>
                      </button>
                    </div>
                    <ScheduleForm sendTo={sendTo} address={addressForMessage} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="modal__overlay" aria-label="Close modal" onClick={handleModalClose}></div>
      </div>
    </div>
  );
};
