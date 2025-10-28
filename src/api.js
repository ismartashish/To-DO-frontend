import axios from 'axios';

const BASE_URL = 'https://ismartashish.github.io/To-DO/';

// Attach token in headers if provided
const config = (token) => ({
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
});

// Auth APIs
export const loginUser = (credentials) => axios.post(`${BASE_URL}/auth/login`, credentials);
export const registerUser = (data) => axios.post(`${BASE_URL}/auth/register`, data);

// Todo APIs
export const getTodos = (token) => axios.get(`${BASE_URL}/todos`, config(token));
export const createTodo = (data, token) => axios.post(`${BASE_URL}/todos`, data, config(token));
export const updateTodo = (id, data, token) => axios.put(`${BASE_URL}/todos/${id}`, data, config(token));
export const deleteTodo = (id, token) => axios.delete(`${BASE_URL}/todos/${id}`, config(token));
