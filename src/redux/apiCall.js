import { request } from "../requestMethods";
import { 
    gameFailure,
    gameStart,
    getGameSuccess
} from "./gameReducer";
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

export const getGame = async (dispatch) => {
    dispatch(gameStart());
    try {
        const res = await request.get("/game");
        dispatch(getGameSuccess(res.data));
        console.log("%cSuccess game","color:green;font-size:24px;",res.data)
    } catch (err) {
        dispatch(gameFailure());
        console.log("%cERROR game","color:red;font-size:24px;",err)
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