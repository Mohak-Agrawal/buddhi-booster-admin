import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

const initialState = {
  categories: [],
  currentFilter: 'total_categories',
  categorySearch: '',
};

// Create an async thunk for fetching categories
export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/categories`);
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const fetchCategoriesBySubjectId = createAsyncThunk(
  'categories/fetchCategoriesBySubjectId',
  async (subjectId, { rejectWithValue }) => {
    try {
      if (!subjectId) {
        throw new Error('Subject ID is undefined or null');
      }

      const response = await axios.get(`${API_BASE_URL}/categories/${subjectId}`);

      return response.data;
    } catch (error) {
      // Use rejectWithValue to pass along the error message
      return rejectWithValue(error.message);
    }
  },
);

// Create an async thunk for creating a category
export const createCategory = createAsyncThunk(
  'categories/createCategory',
  async (categoryData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/categories`, categoryData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
);

export const CategorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setVisibilityFilter: (state, action) => {
      state.currentFilter = action.payload;
    },
    searchCategory: (state, action) => {
      state.categorySearch = action.payload;
    },
    deleteCategory: (state, action) => {
      const index = state.categories.findIndex((category) => category.id === action.payload);
      state.categories.splice(index, 1);
    },
  },
  extraReducers: (builder) => {
    // Handle the fulfilled state after a successful fetch
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
    });

    // Handle the rejected state if there's an error
    builder.addCase(fetchCategories.rejected, (state, action) => {
      console.error('Error fetching categories:', action.error.message);
    });

    // Handle the fulfilled state after a successful create
    builder.addCase(createCategory.fulfilled, (state, action) => {
      state.categories.push(action.payload);
    });

    builder.addCase(fetchCategoriesBySubjectId.fulfilled, (state, action) => {
      state.categories = action.payload;
    });

    // Handle the rejected state if there's an error during create
    builder.addCase(createCategory.rejected, (state, action) => {
      console.error('Error creating category:', action.error.message);
    });
  },
});

export const { setVisibilityFilter, searchCategory, deleteCategory } = CategorySlice.actions;

export default CategorySlice.reducer;
