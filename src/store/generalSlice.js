import { createSlice } from '@reduxjs/toolkit';

export const generalSlice = createSlice({
  name: 'general',
  initialState: {
    isAuthenticated: false,
    isLoading: false
  },
  reducers: {
    authenticate: (state) => {
      state.isAuthenticated = true;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    }
  }
});

export const authenticate = generalSlice.actions.authenticate;
export const setLoading = generalSlice.actions.setLoading;
