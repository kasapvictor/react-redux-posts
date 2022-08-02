import { createSlice } from '@reduxjs/toolkit';
import { sub } from 'date-fns';

const initialState = [
  {
    id: '1',
    title: 'First Post!',
    userId: '1',
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    reactions: { thumbsUp: 1, hooray: 0, heart: 0, rocket: 0, eyes: 0 },
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
  {
    id: '2',
    title: 'Second Post',
    userId: '2',
    date: sub(new Date(), { minutes: 20 }).toISOString(),
    reactions: { thumbsUp: 0, hooray: 2, heart: 0, rocket: 0, eyes: 0 },
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
  {
    id: '3',
    title: 'Third Post',
    userId: '0',
    date: sub(new Date(), { minutes: 30 }).toISOString(),
    reactions: { thumbsUp: 0, hooray: 0, heart: 3, rocket: 0, eyes: 0 },
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
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
    postUpdate: (state, action) => {
      const { id, title, content } = action.payload;
      const foundPost = state.find((post) => post.id === id);
      if (foundPost) {
        foundPost.title = title;
        foundPost.content = content;
      }
    },
    postReaction: (state, action) => {
      const { id, reaction } = action.payload;
      const foundPostById = state.find((post) => post.id === id);
      if (foundPostById) {
        foundPostById.reactions[reaction] += 1;
      }
    },
  },
});

export const { postAdd, postRemove, postUpdate, postReaction } = postsSlice.actions;
export default postsSlice.reducer;
