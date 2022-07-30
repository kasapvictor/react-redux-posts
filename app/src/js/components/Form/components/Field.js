import React from 'react';
import cn from 'classnames';

export const Field = ({ placeholder = null, type, meta, props, isCheckbox }) => {
  const { error, touched } = meta;

  const inputClass = cn('form__field', {
    'form__field--error': !!error && touched,
  });

  const checkboxClass = cn('form__checkbox', {
    'form__checkbox--error': !!error && touched,
  });

  const classNames = isCheckbox ? checkboxClass : inputClass;

  return (
    <label className="form__label">
      <input className={classNames} placeholder={placeholder} type={type} {...props} />
      {!!error && touched && <span className="form__field-error-text">{error}</span>}
    </label>
  );
};
