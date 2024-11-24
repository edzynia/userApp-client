import { AppDispatch } from '../redux/store';
import { fetchUserById } from '../redux/userSlice';

export const fetchUserIfNotCached = (id: number, dispatch: AppDispatch) => {
  const cachedUser = localStorage.getItem('currentUser');

  if (cachedUser) {
    dispatch({
      type: 'users/fetchUserById/fulfilled',
      payload: JSON.parse(cachedUser),
    });
  } else {
    dispatch(fetchUserById(id))
      .unwrap()
      .then((user) => {
        localStorage.setItem('currentUser', JSON.stringify(user));
      })
      .catch((err) => {
        console.error('Failed to fetch user:', err);
      });
  }
};
