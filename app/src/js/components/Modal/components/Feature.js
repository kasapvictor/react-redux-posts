import React from 'react';

export const Feature = ({ icon, type, content }) => (
  <div className="modal__features-item">
    <span className="modal__features-ico">{icon}</span>
    <div className="modal__features-item__content">
      <span className="modal__features-item__heading">{type}</span>
      <span className="modal__features-item-text modal__color--mute">{content}</span>
    </div>
  </div>
);
