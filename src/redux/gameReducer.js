import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    collection: [],
    isFetching: false,
    error: false
};

export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        gameStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        gameFailure: (state) => {
            state.isFetching = false;
            state.error = true
        },
        getGameSuccess: (state, action) => {
            state.isFetching = false;
            state.collection = action.payload
        },
    }
});

export const { 
    gameStart, 
    gameFailure,
    getGameSuccess
  } = gameSlice.actions;

export default gameSlice.reducer;