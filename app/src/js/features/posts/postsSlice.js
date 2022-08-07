import { createSlice, createAsyncThunk, createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

const URL_FETCH_POSTS = 'https://dummyjson.com/posts';
const URL_ADD_NEW_POST = 'https://dummyjson.com/posts/add';
const URL_UPDATE_POST = 'https://dummyjson.com/posts';
const URL_REMOVE_POST = 'https://dummyjson.com/posts';

const IDLE_STATUS = 'idle';
const LOADING_STATUS = 'loading';
const SUCCESS_STATUS = 'succeeded';
const FAILED_STATUS = 'failed';

const postsAdapter = createEntityAdapter();

// getInitialState() ->  {ids: [], entities: {}}
const initialState = postsAdapter.getInitialState({
  statusFetch: IDLE_STATUS, // 'idle' | 'loading' | 'succeeded' | 'failed'
  statusUpdate: IDLE_STATUS, // 'idle' | 'loading' | 'succeeded' | 'failed'
  statusRemove: IDLE_STATUS,
  postUpdatingId: null,
  error: null,
});

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
  const response = await axios.put(`${URL_UPDATE_POST}/${id}`, restData);

  return response.data;
});

export const removePost = createAsyncThunk('post/remove', async (data) => {
  const { id } = data;
  const response = await axios.delete(`${URL_REMOVE_POST}/${id}`);
  return response.data;
});

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postUpdatingId: (state, action) => {
      state.postUpdatingId = action.payload;
    },
    resetUpdateStatus: (state) => {
      state.statusUpdate = IDLE_STATUS;
    },
    resetRemoveStatus: (state) => {
      state.statusRemove = IDLE_STATUS;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.statusFetch = LOADING_STATUS;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.statusFetch = SUCCESS_STATUS;
        postsAdapter.upsertMany(state, action.payload.posts);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.statusFetch = FAILED_STATUS;
        state.error = action.error.message;
      })
      .addCase(addNewPost.fulfilled, postsAdapter.addOne)
      .addCase(updatePost.pending, (state) => {
        state.statusUpdate = LOADING_STATUS;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.statusUpdate = SUCCESS_STATUS;
        const { id, title, body, userId, tags, reactions } = action.payload;
        const foundPost = state.entities[id];

        if (foundPost) {
          foundPost.title = title;
          foundPost.body = body;
          foundPost.userId = userId;
          foundPost.tags = tags;
          foundPost.reactions = reactions;
        }
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.statusUpdate = FAILED_STATUS;
        state.error = action.error.message;
      })
      .addCase(removePost.pending, (state) => {
        state.statusRemove = LOADING_STATUS;
      })
      .addCase(removePost.fulfilled, (state, action) => {
        state.statusRemove = SUCCESS_STATUS;
        const {
          payload: { id },
        } = action;
        postsAdapter.removeOne(state, id);
      })
      .addCase(removePost.rejected, (state, action) => {
        state.statusRemove = FAILED_STATUS;
        state.error = action.error.message;
      });
  },
});

export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostsIds,
} = postsAdapter.getSelectors((state) => state.posts);

export const { postUpdatingId, resetRemoveStatus, resetUpdateStatus } = postsSlice.actions;

export const selectPostsByUser = createSelector([selectAllPosts, (state, userId) => userId], (posts, userId) =>
  posts.filter((post) => +post.userId === +userId),
);

export default postsSlice.reducer;
