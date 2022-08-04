import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const URL_FETCH_POSTS = 'https://dummyjson.com/posts';
const URL_ADD_NEW_POST = 'https://dummyjson.com/posts/add222';

const initialState = {
  posts: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await axios.get(URL_FETCH_POSTS);
  return response.data;
});

export const addNewPost = createAsyncThunk('posts/addPost', async (data) => {
  const response = await axios.post(URL_ADD_NEW_POST, data);
  return response.data;
});

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postRemove: (state, action) => {
      const { payload } = action;
      return state.posts.filter((post) => post.id !== payload);
    },
    postUpdate: (state, action) => {
      const { id, title, content } = action.payload;
      const foundPost = state.posts.find((post) => post.id === id);
      if (foundPost) {
        foundPost.title = title;
        foundPost.content = content;
      }
    },
    postReaction: (state, action) => {
      const { id, reaction } = action.payload;
      const foundPostById = state.posts.find((post) => post.id === id);
      if (foundPostById) {
        foundPostById.reactions[reaction] += 1;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = [...state.posts, ...action.payload.posts];
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        console.log('action', action);
        state.posts = [action.payload, ...state.posts];
      });
  },
});

export const selectAllPosts = (state) => state.posts.posts;
export const selectPostById = (state, postId) => state.posts.posts.find((post) => post.id === postId);
export const { postAdd, postRemove, postUpdate, postReaction } = postsSlice.actions;

export default postsSlice.reducer;
