import React from 'react';
import cn from 'classnames';

export const Agreement = ({ placeholder = null, type, meta, props }) => {
  const { error, touched } = meta;

  const checkboxClass = cn('form__checkbox', {
    'form__checkbox--error': !!error && touched,
  });

  return (
    <>
      <input className={checkboxClass} placeholder={placeholder} type={type} {...props} />
      {!!error && touched && <span className="form__field-error-text">{error}</span>}
    </>
  );
};
