import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    collection: [],
    isFetching: false,
    error: false
};

export const territoriesSlice = createSlice({
    name: 'territories',
    initialState,
    reducers: {
        territoriesStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        territoriesFailure: (state) => {
            state.isFetching = false;
            state.error = true
        },
        getTerritoriesSuccess: (state, action) => {
            state.isFetching = false;
            state.collection = action.payload
        },
    }
});

export const { 
    territoriesStart, 
    territoriesFailure,
    getTerritoriesSuccess
  } = territoriesSlice.actions;

export default territoriesSlice.reducer;