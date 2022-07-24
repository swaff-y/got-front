import { combineReducers } from "redux";
import gameReducer from "./gameReducer";
import usersReducer from "./usersReducer";
import territoriesReducer from "./territoriesReducer";

const allReducers = combineReducers({
    game: gameReducer,
    users: usersReducer,
    territories: territoriesReducer
})

export default allReducers;