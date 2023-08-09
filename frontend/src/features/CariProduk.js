import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  produk: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const CariProduk = createAsyncThunk('produk/CariProduk', async (keyword, thunkAPI) => {
  try {
    const response = await axios.get(`http://localhost:5000/caribarang?searchQuery=${keyword}`);
    return response.data;
  } catch (error) {
    const message = error.response.data.msg;
    return thunkAPI.rejectWithValue(message);
  }
});

export const cariProdukSlice = createSlice({
  name: 'cariProduk',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(CariProduk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(CariProduk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.produk = action.payload;
    });
    builder.addCase(CariProduk.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
  },
});

export const { reset } = cariProdukSlice.actions;
export default cariProdukSlice.reducer;
