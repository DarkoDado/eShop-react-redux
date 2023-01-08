import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    alert: []
}

const notificationSlice = createSlice({
  name: alert,
  initialState,
  reducers: {
    alertNotification(state, action) {
        state.alert.push({message: action.payload,
        type: action.payload})
    }
  }
});

export const {} = notificationSlice.actions

export default notificationSlice.reducer