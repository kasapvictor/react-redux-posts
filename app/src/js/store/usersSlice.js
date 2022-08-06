import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const URL_FETCH_USERS = 'https://dummyjson.com/users';

const initialState = [];

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get(URL_FETCH_USERS);
  return response.data;
});

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, (state, action) => action.payload.users);
  },
});

export const selectAllUsers = (state) => state.users;
export const selectUserById = (state, userId) => state.users.find((user) => user.id === userId);

export default userSlice.reducer;
