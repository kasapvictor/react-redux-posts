import React from 'react';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';

import { App } from './App';
import { Store } from './store';
import { validateEmail } from './utils';

import '../scss/styles.scss';

const container = document.getElementById('idx_properties');
const email = container?.dataset?.idxEmail;
const status = container?.dataset?.idxStatus;
const sendTo = container?.dataset?.idxSendTo;

let isValid = true;
const emailIsValid = validateEmail(email);
const sendToIsValid = validateEmail(sendTo);

if (email && !emailIsValid) {
  // eslint-disable-next-line no-console
  console.warn('Error email of data-idx-email:', email);
  isValid = false;
}

if (sendTo && !sendToIsValid) {
  // eslint-disable-next-line no-console
  console.warn('Error email of data-idx-send-to:', sendTo);
  isValid = false;
}

if (!email) {
  // eslint-disable-next-line no-console
  console.warn('Error email of data-idx-email');
  isValid = false;
}

if (!status) {
  // eslint-disable-next-line no-console
  console.warn('Error email of data-idx-status');
  isValid = false;
}

if (container) {
  const root = createRoot(container);

  root.render(<Provider store={Store}>{isValid && <App email={email} status={status} sendTo={sendTo} />}</Provider>);
}
