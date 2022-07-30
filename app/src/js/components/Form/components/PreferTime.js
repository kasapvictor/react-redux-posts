import React, { useState } from 'react';
import cn from 'classnames';

const formatHour = {
  0: '9:00 AM',
  1: '10:00 AM',
  2: '11:00 AM',
  3: '12:00 AM',
  4: '1:00 PM',
  5: '2:00 PM',
  6: '3:00 PM',
  7: '4:00 PM',
  8: '5:00 PM',
  9: '6:00 PM',
  10: '7:00 PM',
  11: '8:00 PM',
  12: '9:00 PM',
};

const Option = ({ time, handleChange, onClick, isActive }) => {
  const labelClass = cn('form__label form__select-option', {
    'form__select-option--active': isActive,
  });

  return (
    <label className={labelClass}>
      <input
        className="form__field form__field--hidden"
        onChange={handleChange}
        name="preferredTime"
        onClick={onClick}
        type="radio"
        value={time}
      />
      <span className="form__select-option-name">{time}</span>
    </label>
  );
};

export const PreferTime = ({ handleChange }) => {
  const MAX_HOURS = 13;
  const hoursArray = Array(MAX_HOURS).fill(null);
  const [currentHour, setCurrentHour] = useState(formatHour[0]);
  const [activeSelect, setActiveSelect] = useState(0);

  const handleSelect = (idx) => (e) => {
    const {
      target: { value },
    } = e;
    setCurrentHour(value);
    setActiveSelect(idx);
  };

  return (
    <div className="form__select">
      <div className="form__select-field">
        <div className="form__select-chose">{currentHour}</div>
      </div>
      <div className="form__select-options">
        <div className="form__select-options--container">
          <div className="form__select-options-inner">
            {hoursArray.map((_, idx) => (
              <Option
                key={idx}
                handleChange={handleChange}
                time={formatHour[idx]}
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
