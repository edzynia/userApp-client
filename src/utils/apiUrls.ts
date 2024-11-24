const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';
const USERS_ENDPOINT = process.env.REACT_APP_USERS_ENDPOINT || 'users';
const AUTH_LOGIN_ENDPOINT =
  process.env.REACT_APP_AUTH_LOGIN_ENDPOINT || 'auth/login';

// Generating URL
export const getUsersUrl = () => `${API_BASE_URL}/${USERS_ENDPOINT}`;
export const getUserByIdUrl = (userId: number) =>
  `${API_BASE_URL}/${USERS_ENDPOINT}/${userId}`;
export const updateUserUrl = (userId: number) =>
  `${API_BASE_URL}/${USERS_ENDPOINT}/${userId}`;
export const getAuthLoginUrl = () => `${API_BASE_URL}/${AUTH_LOGIN_ENDPOINT}`;
