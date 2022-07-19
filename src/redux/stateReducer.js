import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    collection: [],
    isFetching: false,
    error: false
};

export const stateSlice = createSlice({
    name: 'pickState',
    initialState,
    reducers: {
        stateStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        stateFailure: (state) => {
            state.isFetching = false;
            state.error = true
        },
        getStateSuccess: (state, action) => {
            state.isFetching = false;
            state.collection = action.payload
        },
    }
});

export const { 
    stateStart, 
    stateFailure,
    getStateSuccess
  } = stateSlice.actions;

export default stateSlice.reducer;