const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || 'https://jsonplaceholder.typicode.com';
const USERS_ENDPOINT = process.env.REACT_APP_USERS_ENDPOINT || '/users';

export const getUsersUrl = () => `${API_BASE_URL}${USERS_ENDPOINT}`;
export const getUserByIdUrl = (userId: number) =>
  `${API_BASE_URL}${USERS_ENDPOINT}/${userId}`;
export const updateUserUrl = (userId: number) =>
  `${API_BASE_URL}${USERS_ENDPOINT}/${userId}`;
