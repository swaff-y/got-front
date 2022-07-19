import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    collection: [],
    isFetching: false,
    error: false
};

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        usersStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        usersFailure: (state) => {
            state.isFetching = false;
            state.error = true
        },
        getUsersSuccess: (state, action) => {
            state.isFetching = false;
            state.collection = action.payload
        },
    }
});

export const { 
    usersStart, 
    usersFailure,
    getUsersSuccess
  } = usersSlice.actions;

export default usersSlice.reducer;