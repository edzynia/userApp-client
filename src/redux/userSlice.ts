import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../redux/store';
import { User } from '../types/interfaces';
import { getUsersUrl, getUserByIdUrl, updateUserUrl } from '../utils/apiUrls'; // Centralized API URLs

interface UserState {
  users: User[];
  currentUser: User | null;
  userId: number | null;
  email: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  currentUser: null,
  userId: null,
  email: null,
  loading: false,
  error: null,
};

// Fetch all users
export const fetchUsers = createAsyncThunk<
  User[],
  void,
  { rejectValue: string }
>('users/fetchUsers', async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(getUsersUrl());

    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }

    return response.json();
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : 'An unknown error occurred.',
    );
  }
});

// Fetch single user
export const fetchUserById = createAsyncThunk<
  User,
  number,
  { state: RootState; rejectValue: string }
>('users/fetchUserById', async (userId, { getState, rejectWithValue }) => {
  try {
    const state = getState();
    const token = state.auth?.token || localStorage.getItem('token');

    if (!token) {
      throw new Error('Unauthorized: No token found');
    }

    const response = await fetch(getUserByIdUrl(userId), {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }

    return response.json();
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : 'Unknown error',
    );
  }
});

// Update user
export const updateUser = createAsyncThunk<
  User,
  User,
  { state: RootState; rejectValue: string }
>('users/updateUser', async (updatedUser, { getState, rejectWithValue }) => {
  try {
    const state = getState();
    const token = state.auth?.token || localStorage.getItem('token');

    if (!token) {
      throw new Error('Unauthorized: No token found');
    }

    const response = await fetch(updateUserUrl(updatedUser.id), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedUser),
    });

    if (!response.ok) {
      throw new Error('Failed to update user');
    }

    return response.json();
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : 'An unknown error occurred.',
    );
  }
});

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setSelectedUser(
      state,
      action: PayloadAction<{ id: number; email: string }>,
    ) {
      state.userId = action.payload.id;
      state.email = action.payload.email;
    },
    clearSelectedUser(state) {
      state.userId = null;
      state.email = null;
    },
    clearCurrentUser(state) {
      state.currentUser = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch users';
      })
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchUserById.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.currentUser = action.payload;
          state.loading = false;
        },
      )
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Could not upload user';
      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<User>) => {
        const updatedUser = action.payload;

        state.users = state.users.map((user) =>
          user.id === updatedUser.id ? updatedUser : user,
        );

        if (state.currentUser?.id === updatedUser.id) {
          state.currentUser = updatedUser;
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.payload || 'Failed to update user';
      });
  },
});

// Export actions
export const { setSelectedUser, clearSelectedUser, clearCurrentUser } =
  userSlice.actions;

// Export reducer
export default userSlice.reducer;
