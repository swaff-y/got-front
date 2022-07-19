import { combineReducers } from "redux";
import stateReducer from "./stateReducer";
import usersReducer from "./usersReducer";

const allReducers = combineReducers({
    pickState: stateReducer,
    users: usersReducer,
})

export default allReducers;