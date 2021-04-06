import { createSlice } from '@reduxjs/toolkit';
import { labels } from '../constants';

export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: {
    message: null,
    type: null
  },
  reducers: {
    add: (state, action) => {
      state.type = action.payload.type;
      state.message = action.payload.message;
    },
    clear: (state) => {
      state.type = null;
      state.message = null;
    }
  }
});

const reducer = notificationsSlice.reducer;
const actions = { ...notificationsSlice.actions };

export const addNotification = (response, thunkAPI) => {
  const responseMessage = {
    message: response.data.message,
    type: response.data.type
  }

  thunkAPI.dispatch(actions.add(responseMessage));
}

export const addErrorNotification = (thunkAPI, message = labels.GENERIC_ERROR_MESSAGE) => {
  const responseMessage = {
    message,
    type: 'error'
  };

  thunkAPI.dispatch(actions.add(responseMessage));
}

export default {
  actions,
  reducer
};
