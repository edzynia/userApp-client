import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getUsersUrl } from '../utils/apiUrls';

interface AuthState {
  token: string | null;
  email: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: null,
  email: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

// Mock API request for login
export const loginUser = createAsyncThunk<
  { token: string; id: number }, // Success response
  { email: string; password: string }, // Input payload
  { rejectValue: string } // Rejection payload
>('auth/loginUser', async ({ email, password }, thunkAPI) => {
  try {
    const FAKE_PASSWORD = process.env.REACT_APP_FAKE_PASSWORD || '123';
    const FAKE_TOKEN = process.env.REACT_APP_FAKE_TOKEN || 'fake-token-123456';

    if (!email || !password) {
      throw new Error('Email and password are required.');
    }

    if (password !== FAKE_PASSWORD) {
      throw new Error('Incorrect email or password.');
    }

    // Simulate server logic for user validation
    const userResponse = await fetch(getUsersUrl());
    if (!userResponse.ok) {
      throw new Error('Failed to fetch users.');
    }

    const users = await userResponse.json();

    // Check if email exists
    const user = users.find((u: { email: string }) => u.email === email);
    if (!user) {
      throw new Error('User not found.');
    }

    // Return token and user ID
    return { token: FAKE_TOKEN, id: user.id };
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error instanceof Error ? error.message : 'Something went wrong.',
    );
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.email = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    clearError(state) {
      state.error = null; // Clear error
    },
    resetAuthState(state) {
      return initialState; // Reset to initial state
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<{ token: string; id: number }>) => {
          state.token = action.payload.token;
          state.isAuthenticated = true;
          state.email = action.payload.token; // Optional if email is returned
          state.loading = false;
        },
      )
      .addCase(
        loginUser.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.error = action.payload || 'Authorization error.';
          state.loading = false;
        },
      );
  },
});

export const { logout, clearError, resetAuthState } = authSlice.actions;
export default authSlice.reducer;
