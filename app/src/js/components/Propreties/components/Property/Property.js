import React from 'react';

import { Arrow, Bookmark } from '../../../../icons';
import { formatPrice } from '../../../../utils';

export const Property = ({ property, status, openDetails, setTypeModal }) => {
  const { image, address, cityName, countyName, zipcode, soldPrice, price } = property;
  const { url: imageUrl } = image[0];
  const isActiveStatus = status === 'active';
  const statusConfig = {
    active: {
      statusClass: 'product__status product__status--active',
      priceClass: 'product__price-text product__price-text--active',
      cost: price,
    },
    sold: {
      statusClass: 'product__status product__status-inactive',
      priceClass: 'product__price-text product__price-text--sold',
      cost: soldPrice,
    },
  };

  // console.log('property', property); // fullDetailsURL

  const handleDetails = (type) => () => {
    setTypeModal(type);
    openDetails();
  };

  return (
    <div className="properties__item">
      <div className="product">
        <div className="product__image-wrapper">
          <img className="product__image image" src={imageUrl} loading="lazy" alt={address} />
        </div>
        <div className="product__details">
          <div className="product__details-inner">
            <div className="product__name">{address}</div>
            <div className="product__address">
              {cityName}, {countyName} {zipcode}
            </div>

            <div className="product__price">
              {!isActiveStatus && <div className="product__price-notice">Sold for</div>}
              <div className={statusConfig[status].priceClass}>{formatPrice(statusConfig[status].cost)}</div>
            </div>
          </div>
          <div className="product__buttons">
            {isActiveStatus && (
              <button className="idx__button idx__button--active" onClick={handleDetails('schedule')}>
                <span className="idx__button-text">Schedule Viewing</span>
                <span className="idx__button-icon">
                  <Arrow />
                </span>
              </button>
            )}

            <button className="idx__button" onClick={handleDetails('details')}>
              <span className="idx__button-text">Learn more</span>
              <span className="idx__button-icon">
                <Arrow />
              </span>
            </button>
          </div>
        </div>
        <div className={statusConfig[status].statusClass}>
          <span className="product__status-text">{status}</span>
        </div>
        {isActiveStatus && (
          <span className="product__bookmark">
            <Bookmark />
          </span>
        )}
      </div>
    </div>
  );
};
