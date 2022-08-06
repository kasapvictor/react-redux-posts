import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import axios from 'axios';

const URL_FETCH_POSTS = 'https://dummyjson.com/posts';
const URL_ADD_NEW_POST = 'https://dummyjson.com/posts/add';
const URL_UPDATE_POST = 'https://dummyjson.com/posts';

const initialState = {
  posts: [],
  statusFetch: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  statusUpdate: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  postUpdatingId: null,
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

export const updatePost = createAsyncThunk('posts/updatePost', async (data) => {
  const { id, ...restData } = data;

  console.log('UPDATE restData', restData);

  const response = await axios.put(`${URL_UPDATE_POST}/${id}`, restData);

  console.log('UPDATE response', response);

  return response.data;
});

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postUpdatingId: (state, action) => {
      console.log(action);
      state.postUpdatingId = action.payload;
    },
    postRemove: (state, action) => {
      const { payload } = action;
      return state.posts.filter((post) => post.id !== payload);
    },
    resetUpdateStatus: (state) => {
      state.statusUpdate = 'idle';
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.statusFetch = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.statusFetch = 'succeeded';
        state.posts = [...state.posts, ...action.payload.posts];
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.statusFetch = 'failed';
        state.error = action.error.message;
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        state.posts = [action.payload, ...state.posts];
      })
      .addCase(updatePost.pending, (state) => {
        state.statusUpdate = 'loading';
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.statusUpdate = 'succeeded';
        const { id, title, body, userId, tags, reactions } = action.payload;
        const foundPost = state.posts.find((post) => post.id === +id);

        if (foundPost) {
          foundPost.title = title;
          foundPost.body = body;
          foundPost.userId = userId;
          foundPost.tags = tags;
          foundPost.reactions = reactions;
        }
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.statusUpdate = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectAllPosts = (state) => state.posts.posts;
export const selectPostById = (state, postId) => state.posts.posts.find((post) => post.id === postId);
export const { postUpdatingId, postRemove, resetUpdateStatus } = postsSlice.actions;

export const selectPostsByUser = createSelector([selectAllPosts, (state, userId) => userId], (posts, userId) =>
  posts.filter((post) => +post.userId === +userId),
);

export default postsSlice.reducer;
