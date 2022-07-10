import { fetchMarkdown } from 'app/apis/markdownApi';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchMarkdownThunk = createAsyncThunk(
  'features/fetchMarkdown',
  async (url: string) => {
    const { data } = await fetchMarkdown(url);
    return data;
  }
);
