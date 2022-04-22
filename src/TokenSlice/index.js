import { createSlice } from '@reduxjs/toolkit';

 export const tokenSlice = createSlice({
   name: 'auth',
   initialState: {
     accessToken: '',
     isAuthorized: false,
     user: {},
   },
   reducers: {
     login: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.isAuthorized = true;
      state.user = action.payload.user;

      localStorage.setItem('accessToken', state.accessToken);
      localStorage.setItem('expiredDate', action.payload.expiredDate);
      localStorage.setItem('user', JSON.stringify(state.user));
    },
    logout: (state, _) => {
      state.accessToken = '';
      state.isAuthorized = false;
      state.user = {};

      localStorage.removeItem('accessToken');
      localStorage.removeItem('expiredDate');
      localStorage.removeItem('user');
     }
   }
 });

 export const { login, logout } = tokenSlice.actions;

 export default tokenSlice.reducer;