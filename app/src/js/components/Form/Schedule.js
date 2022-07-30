import React, { useState } from 'react';
import { useFormik } from 'formik';
import cn from 'classnames';
import * as Yup from 'yup';
import 'yup-phone';
import axios from 'axios';

import { getDate } from '../../utils';

import { Agreement, Field, PreferDay, PreferTime } from './components';

export const Schedule = ({ sendTo, address }) => {
  const [isSent, setIsSent] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [submitButtonText, setSubmitButtonText] = useState('Send');

  const validationSchema = Yup.object().shape({
    phone: Yup.string().phone('US', true, 'Phone number is not valid').required('Phone is a required field'),
    email: Yup.string().email('Email must be a valid email').required('Email is a required field'),
  });

  const defaultMessage = `I am interested in ${address}`;

  const formik = useFormik({
    validationSchema,
    initialValues: {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      message: defaultMessage,
      agreement: false,
      typeTour: 'In Person',
      preferredDay: getDate(),
      preferredTime: '9:00 AM',
    },
    onSubmit: async (values, { resetForm }) => {
      const url = 'https://services.wowmi.us/api/web/api/v1/idx/form';

      setIsDisabled(true);
      setSubmitButtonText('Sending ...');

      try {
        const response = axios.post(url, { form: 'idx-schedule', sendTo, ...values });
        const result = (await response).data;
        // eslint-disable-next-line no-console
        console.log(result);
        setIsSent(true);
        resetForm();
      } catch (err) {
        const {
          response: { status },
        } = err;

        if (!err.isAxiosError) {
          // eslint-disable-next-line no-console
          console.log(err);
        }

        if (status === 500) {
          // eslint-disable-next-line no-console
          console.log('Error 500: Internal Server Error');
        }

        setIsFailed(true);
      } finally {
        setTimeout(() => {
          setIsDisabled(false);
          setSubmitButtonText('Send');
        }, 1000);
      }
    },
  });

  const { values, handleSubmit, handleChange, getFieldMeta, getFieldProps } = formik;
  const formClass = cn('idx__form', {
    'idx__form--success': isSent,
    'idx__from--failed': isFailed,
  });

  const handleSuccess = () => {
    setIsSent(false);
    setIsFailed(false);
  };

  return (
    <div className={formClass}>
      <div className="modal__content-header-title">Tour with a Buyers’ Agent</div>

      <form className="form idx__form-schedule" onSubmit={handleSubmit}>
        <div className="form__inner">
          <div className="form__row form__row--f-start form__row--py-4">
            <label className="form__label form__label-button">
              <input
                className="form__field form__field--hidden"
                type="radio"
                name="typeTour"
                value="In Person"
                checked={values.typeTour === 'In Person'}
                onChange={handleChange}
              />
              <span className="form__label-text">In Person</span>
            </label>
            <label className="form__label form__label-button">
              <input
                className="form__field form__field--hidden"
                type="radio"
                name="typeTour"
                value="Videochat"
                checked={values.typeTour === 'Videochat'}
                onChange={handleChange}
              />
              <span className="form__label-text">Videochat</span>
            </label>
          </div>

          <div className="form__row form__row--f-start">
            <div className="form__title form__title--h3">Select a preferred time</div>
          </div>
          <div className="form__row idx--pb-5">
            <PreferDay handleChange={handleChange} />
            <PreferTime handleChange={handleChange} />
          </div>

          <div className="form__row">
            <Field
              type="text"
              placeholder="First Name"
              meta={getFieldMeta('firstName')}
              props={getFieldProps('firstName')}
            />

            <Field
              type="text"
              placeholder="Last Name"
              meta={getFieldMeta('lastName')}
              props={getFieldProps('lastName')}
            />
          </div>

          <div className="form__row">
            <Field type="tel" placeholder="Phone *" meta={getFieldMeta('phone')} props={getFieldProps('phone')} />
          </div>

          <div className="form__row">
            <Field type="email" placeholder="Email *" meta={getFieldMeta('email')} props={getFieldProps('email')} />
          </div>

          <div className="form__row">
            <label className="form__label">
              <textarea
                className="form__field form__textarea"
                onChange={handleChange}
                value={values.message}
                placeholder="Message"
                name="message"
              ></textarea>
            </label>
          </div>

          <div className="form__row">
            <label className="form__label form__agreement">
              <Agreement type="checkbox" meta={getFieldMeta('agreement')} props={getFieldProps('agreement')} />
              <span className="form__checkbox-symbol"></span>
              <span className="form__agreement-text">I want to receive financing information</span>

              <span className="form__agreement-notice idx__text--small idx__text--mute">
                By pressing Send, you agree that Company Group and its affiliates, and real estate professionals may
                call/text you about your inquiry, which may involve use of automated means and prerecorded/artificial
                voices.
              </span>
            </label>
          </div>

          <div className="form__row">
            <button className="form__submit idx__button idx__button--active" type="submit" disabled={isDisabled}>
              {submitButtonText}
            </button>
          </div>
        </div>
      </form>
      <div className="form__success">
        <div className="form__success-title">You're all set!</div>
        <div className="form__success-text">The agent has been emailed and will reply to you directly.</div>

        <div className="form__success-buttons">
          <button type="button" className="form__submit idx__button idx__button--active" onClick={handleSuccess}>
            Okay!
          </button>
        </div>
      </div>
      <div className="form__failed">
        <div className="form__failed-title">Some Error...</div>
        <div className="form__failed-text">
          We have some trouble right now. <br /> Please try later...
        </div>

        <div className="form__success-buttons">
          <button type="button" className="form__submit idx__button idx__button--active" onClick={handleSuccess}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
