import React, { useState } from 'react';
import cn from 'classnames';

import { getDate } from '../../../utils';

const Option = ({ number, handleChange, onClick, isActive }) => {
  const day = getDate(number);

  const labelClass = cn('form__label form__select-option', {
    'form__select-option--active': isActive,
  });

  return (
    <label className={labelClass}>
      <input
        className="form__field form__field--hidden"
        onChange={handleChange}
        name="preferredDay"
        onClick={onClick}
        type="radio"
        value={day}
      />
      <span className="form__select-option-name">{day}</span>
    </label>
  );
};

export const PreferDay = ({ handleChange }) => {
  const MAX_DAYS = 14;
  const daysArray = Array(MAX_DAYS).fill(null);
  const [currentDate, setCurrentDate] = useState(getDate());
  const [activeSelect, setActiveSelect] = useState(0);

  const handleSelect = (idx) => (e) => {
    const {
      target: { value },
    } = e;
    setCurrentDate(value);
    setActiveSelect(idx);
  };

  return (
    <div className="form__select">
      <div className="form__select-field">
        <div className="form__select-chose">{currentDate}</div>
      </div>
      <div className="form__select-options">
        <div className="form__select-options--container">
          <div className="form__select-options-inner">
            {daysArray.map((_, idx) => (
              <Option
                key={idx}
                handleChange={handleChange}
                number={idx + 1}
                onClick={handleSelect(idx)}
                isActive={activeSelect === idx}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
