import {createSlice} from "@reduxjs/toolkit";
import {initialState} from "@/redux/store";
import rootReducer from "@/redux/reducers/rootReducer";
import {HYDRATE} from "next-redux-wrapper";

export const rootSlice = createSlice({
    name:'rootSlice',
    initialState: initialState,
    reducers: rootReducer,

    extraReducers: {
        [HYDRATE] : (state, action) => {

            state.name = action.payload.profile.name;
        }
    }
})


export default rootSlice.reducer