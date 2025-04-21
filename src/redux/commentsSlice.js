

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (postId) => {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
    return response.data;
  }
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    addComment: (state, action) => {
      state.items.push(action.payload.comment);
    },
    deleteComment: (state, action) => {
      state.items = state.items.filter(comment => comment.id !== action.payload.commentId);
    },
    setComments: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchComments.rejected, (state) => {
        state.loading = false;
        state.error = 'Ошибка загрузки комментариев';
      });
  },
});

export const { addComment, deleteComment, setComments } = commentsSlice.actions;
export default commentsSlice.reducer;
