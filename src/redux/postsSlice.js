// src/redux/postsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
  return response.data;
});

const postsSlice = createSlice({
  name: 'posts',
  initialState: { items: [], loading: false, error: null },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.error = 'Ошибка загрузки постов';
        state.loading = false;
      });
  },
});


export const deletePost = createAsyncThunk('posts/deletePost', async (postId) => {
  await axios.delete(`https://jsonplaceholder.typicode.com/posts/${postId}`);
  return postId;
});




export default postsSlice.reducer;
