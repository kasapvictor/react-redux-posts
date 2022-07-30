import { configureStore } from '@reduxjs/toolkit';

import propertyReducer from './propertiesSlice';

export const Store = configureStore({
  reducer: {
    properties: propertyReducer,
  },
});
