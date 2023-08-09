import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  admin: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const LoginAdmin = createAsyncThunk('admin/LoginAdmin', async (admin, thunkAPI) => {
  try {
    const response = await axios.post('http://localhost:5000/login', {
      email: admin.email,
      password: admin.password,
    });
    return response.data;
  } catch (error) {
    const message = error.response.data.msg;
    return thunkAPI.rejectWithValue(message);
  }
});

export const AdminMe = createAsyncThunk('admin/Me', async (_, thunkAPI) => {
  try {
    const response = await axios.get('http://localhost:5000/me');
    return response.data;
  } catch (error) {
    if (error.response) {
      const message = error.response.data.msg;
      return thunkAPI.rejectWithValue(message);
    }
  }
});

export const AdminLogout = createAsyncThunk('admin/Logout', async () => {
  await axios.delete('http://localhost:5000/logout');
});

export const authSlice = createSlice({
  name: 'adminAuth',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(LoginAdmin.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(LoginAdmin.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.admin = action.payload;
    });
    builder.addCase(LoginAdmin.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    // Get User Login
    builder.addCase(AdminMe.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(AdminMe.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.admin = action.payload;
    });
    builder.addCase(AdminMe.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
