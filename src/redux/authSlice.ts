import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getAuthLoginUrl } from '../utils/apiUrls';

interface AuthState {
  token: string | null;
  email: string | null;
  userId: number | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: null,
  email: null,
  userId: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

export const loginUser = createAsyncThunk<
  { token: string; id: number },
  { email: string; password: string },
  { rejectValue: string }
>('auth/loginUser', async ({ email, password }, thunkAPI) => {
  try {
    const response = await fetch(getAuthLoginUrl(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Invalid login credentials.');
    }

    const data = await response.json();

    // Saving token in local storage
    localStorage.setItem('token', data.token);

    return { token: data.token, id: data.userId };
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error instanceof Error ? error.message : 'An unknown error occurred.',
    );
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
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
          state.userId = action.payload.id;
          state.isAuthenticated = true;
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

export const { clearError } = authSlice.actions;

export default authSlice.reducer;
