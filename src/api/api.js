
const API_URL = 'https://jsonplaceholder.typicode.com';

export const getPosts = async () => {
  const response = await fetch(`${API_URL}/posts`);
  return await response.json();
};

export const getPostById = async (id) => {
  const response = await fetch(`${API_URL}/posts/${id}`);
  return await response.json();
};

export const createPost = async (post) => {
  const response = await fetch(`${API_URL}/posts`, {
    method: 'POST',
    body: JSON.stringify(post),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  return await response.json();
};

export const updatePost = async (id, post) => {
  const response = await fetch(`${API_URL}/posts/${id}`, {
    method: 'PUT',
    body: JSON.stringify(post),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  return await response.json();
};

export const deletePost = async (id) => {
  await fetch(`${API_URL}/posts/${id}`, {
    method: 'DELETE',
  });
  return id;
};


export const getCommentsByPostId = async (postId) => {
  const response = await fetch(`${API_URL}/posts/${postId}/comments`);
  return await response.json();
};

export const addNewComment = async (comment) => {
  const response = await fetch(`${API_URL}/comments`, {
    method: 'POST',
    body: JSON.stringify(comment),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  return await response.json();
};

export const deleteCommentById = async (commentId) => {
  await fetch(`${API_URL}/comments/${commentId}`, {
    method: 'DELETE',
  });
  return commentId;
};


export const getAlbums = async () => {
  const response = await fetch(`${API_URL}/albums`);
  return await response.json();
};

export const getAlbumById = async (id) => {
  const response = await fetch(`${API_URL}/albums/${id}`);
  return await response.json();
};


export const getPhotosByAlbumId = async (albumId) => {
  const response = await fetch(`${API_URL}/albums/${albumId}/photos`);
  return await response.json();
};

export const getUsers = async () => {
  const response = await fetch(`${API_URL}/users`);
  return await response.json();
};

export const getUserById = async (id) => {
  const response = await fetch(`${API_URL}/users/${id}`);
  return await response.json();
};

export const getTodos = async () => {
  const response = await fetch(`${API_URL}/todos`);
  return await response.json();
};



export const getPostsByUserId = async (userId) => {
  const response = await fetch(`${API_URL}/users/${userId}/posts`);
  return await response.json();
};

export const getAlbumsByUserId = async (userId) => {
  const response = await fetch(`${API_URL}/users/${userId}/albums`);
  return await response.json();
};

export const getTodosByUserId = async (userId) => {
  const response = await fetch(`${API_URL}/users/${userId}/todos`);
  return await response.json();
};