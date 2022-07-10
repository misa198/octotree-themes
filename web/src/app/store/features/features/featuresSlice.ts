import { createSlice } from '@reduxjs/toolkit';
import { fetchMarkdownThunk } from './featuresThunk';

interface State {
  content: {
    loading: boolean;
    data: string;
  };
}

const initialState: State = {
  content: {
    loading: false,
    data: '',
  },
};

export const featuresSlide = createSlice({
  name: 'features',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchMarkdownThunk.pending, (state) => {
      state.content.loading = true;
      state.content.data = '';
    });
    builder.addCase(fetchMarkdownThunk.fulfilled, (state, action) => {
      state.content.loading = false;
      state.content.data = action.payload;
    });
    builder.addCase(fetchMarkdownThunk.rejected, (state) => {
      state.content.loading = false;
    });
  },
});

export default featuresSlide.reducer;
