import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const propertiesAdapter = createEntityAdapter();
const initialState = propertiesAdapter.getInitialState();

const propertiesSlice = createSlice({
  name: 'properties',
  initialState,
  reducers: {
    added: propertiesAdapter.addMany,
  },
});

export const { added, setCurrenPropertyId } = propertiesSlice.actions;
export const selectors = propertiesAdapter.getSelectors((state) => state.properties);
export default propertiesSlice.reducer;
