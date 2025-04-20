import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Загрузка комментариев из localStorage
const loadCommentsFromLocalStorage = (postId) => {
  const savedComments = localStorage.getItem(`comments_${postId}`);
  return savedComments ? JSON.parse(savedComments) : [];
};

// Сохранение комментариев в localStorage
const saveCommentsToLocalStorage = (postId, comments) => {
  localStorage.setItem(`comments_${postId}`, JSON.stringify(comments));
};

export const fetchComments = createAsyncThunk('comments/fetchComments', async (postId) => {
  // Сначала получаем локальные комментарии
  const localComments = loadCommentsFromLocalStorage(postId);
  
  // Затем загружаем с сервера
  const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
  
  // Объединяем локальные и серверные комментарии (уникальные по id)
  const allComments = [...localComments, ...response.data];
  const uniqueComments = allComments.filter(
    (comment, index, self) => self.findIndex(c => c.id === comment.id) === index
  );
  
  return uniqueComments;
});

export const addComment = createAsyncThunk('comments/addComment', async ({ postId, comment }) => {
  // Для новых комментариев создаем временный ID (отрицательный, чтобы не конфликтовать с серверными)
  const tempComment = {
    ...comment,
    id: -Date.now(), // Временный ID
    postId: Number(postId),
  };
  
  // Сохраняем в localStorage
  const localComments = loadCommentsFromLocalStorage(postId);
  const updatedComments = [...localComments, tempComment];
  saveCommentsToLocalStorage(postId, updatedComments);
  
  return tempComment;
});

export const deleteComment = createAsyncThunk('comments/deleteComment', async ({ postId, commentId }) => {
  // Удаляем из localStorage
  const localComments = loadCommentsFromLocalStorage(postId);
  const updatedComments = localComments.filter(comment => comment.id !== commentId);
  saveCommentsToLocalStorage(postId, updatedComments);
  
  return { postId, commentId };
});

const commentsSlice = createSlice({
  name: 'comments',
  initialState: { items: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchComments.rejected, (state) => {
        state.error = 'Ошибка загрузки комментариев';
        state.loading = false;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.items = state.items.filter(
          comment => comment.id !== action.payload.commentId
        );
      });
  },
});

export default commentsSlice.reducer;