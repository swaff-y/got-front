import { request } from "../requestMethods";
import { 
    stateFailure,
    stateStart,
    getStateSuccess
} from "./stateReducer";
import { 
    usersFailure,
    usersStart,
    getUsersSuccess
} from "./usersReducer";
import { 
    territoriesFailure,
    territoriesStart,
    getTerritoriesSuccess
} from "./territoriesReducer";

export const getState = async (dispatch) => {
    dispatch(stateStart());
    try {
        const res = await request.get("/state");
        dispatch(getStateSuccess(res.data));
        console.log("%cSuccess state","color:green;font-size:24px;",res.data)
    } catch (err) {
        dispatch(stateFailure());
        console.log("%cERROR state","color:red;font-size:24px;",err)
    }
}
export const getUsers = async (dispatch) => {
    dispatch(usersStart());
    try {
        const res = await request.get("/users");
        dispatch(getUsersSuccess(res.data));
        console.log("%cSuccess users","color:green;font-size:24px;",res.data)
    } catch (err) {
        dispatch(usersFailure());
        console.log("%cERROR users","color:red;font-size:24px;",err)
    }
}
export const getTerritories = async (dispatch) => {
    dispatch(territoriesStart());
    try {
        const res = await request.get("/territories");
        dispatch(getTerritoriesSuccess(res.data));
        console.log("%cSuccess territories","color:green;font-size:24px;",res.data)
    } catch (err) {
        dispatch(territoriesFailure());
        console.log("%cERROR territories","color:red;font-size:24px;",err)
    }
}
export const setTerritory = async (id, territory) => {
    try {
        const res = await request.patch("/territories/" + id, territory);
        console.log("%cSuccess patch territory","color:green;font-size:24px;",id)
        return res;
    } catch (err) {
        console.log("%cERROR territories","color:red;font-size:24px;",err)
        return null
    }
}