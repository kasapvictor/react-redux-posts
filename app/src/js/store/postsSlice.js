import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  { id: '1', title: 'First Post!', content: 'Hello!' },
  { id: '2', title: 'Second Post', content: 'More text' },
  { id: '3', title: 'Third Post', content: 'The post number 3' },
];

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdd: (state, action) => {
      const { payload } = action;
      return [...state, payload];
    },
    postRemove: (state, action) => {
      const { payload } = action;
      return state.filter((post) => post.id !== payload);
    },
  },
});

export const { postAdd, postRemove } = postsSlice.actions;
export default postsSlice.reducer;
