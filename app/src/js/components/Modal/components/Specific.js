import React from 'react';

export const Specific = ({ sqFt, bedrooms, fullBaths }) => (
  <div className="modal__row">
    <div className="modal__spec">
      <div className="modal__spec-item">
        <span className="modal__small modal__text--bold">{sqFt}</span>
        <span className="modal__smaller">sqft</span>
      </div>
      <div className="modal__spec-item">
        <span className="modal__small modal__text--bold">{bedrooms}</span>
        <span className="modal__smaller">bedrooms</span>
      </div>
      <div className="modal__spec-item">
        <span className="modal__small modal__text--bold">{fullBaths}</span>
        <span className="modal__smaller">bathrooms</span>
      </div>
    </div>
  </div>
);
