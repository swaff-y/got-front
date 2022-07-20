import { combineReducers } from "redux";
import stateReducer from "./stateReducer";
import usersReducer from "./usersReducer";
import territoriesReducer from "./territoriesReducer";

const allReducers = combineReducers({
    pickState: stateReducer,
    users: usersReducer,
    territories: territoriesReducer
})

export default allReducers;