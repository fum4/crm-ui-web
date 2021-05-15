import { createSlice } from '@reduxjs/toolkit';
import { labels } from '../constants';

export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: {
    message: null,
    type: null,
    show: false
  },
  reducers: {
    add: (state, action) => {
      state.type = action.payload.type;
      state.message = action.payload.message;
      state.show = true;
    },
    clear: (state) => {
      state.type = null;
      state.message = null;
      state.show = false;
    }
  }
});

export const clearNotification = notificationsSlice.actions.clear;

export const addNotification = (response, thunkAPI) => {
  const responseMessage = {
    message: response.data.message,
    type: response.data.type
  }

  thunkAPI.dispatch(notificationsSlice.actions.add(responseMessage));
}

export const addErrorNotification = (thunkAPI, message = labels.GENERIC_ERROR_MESSAGE) => {
  const responseMessage = {
    message,
    type: 'error'
  };

  thunkAPI.dispatch(notificationsSlice.actions.add(responseMessage));
}
