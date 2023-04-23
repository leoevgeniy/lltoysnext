// import {applyMiddleware} from 'redux';
// import rootReducer from "@/redux/reducers/rootReducer";
// import {createWrapper, Context } from "next-redux-wrapper";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
// import {configureStore} from "@reduxjs/toolkit";

import {Action, configureStore, ThunkAction, applyMiddleware} from "@reduxjs/toolkit";
import {createWrapper, HYDRATE} from "next-redux-wrapper";
import rootReducer from "@/redux/reducers/rootReducer";

const getStoreLocal = (item) => {
    if (localStorage.getItem(item) !== 'undefined') {
        return localStorage.getItem(item);
    }
    return []
}
const isServer = typeof window === "undefined";
let initialState = {}
if (!isServer) {
    initialState = {
        cart: {
            cartItems: JSON.parse(getStoreLocal('cartItems')) || [],
            shippingAddress: JSON.parse(localStorage.getItem('shippingAddress')) || {},
        },
        userLogin: {
            userInfo: JSON.parse(localStorage.getItem('userInfo')),
        }
    }
}

const reducer = (state = initialState, action) => {
    if (action.type === HYDRATE) {
        const nextState = {
            ...state,
            ...action.payload,
        };
        // return nextState;
        return {...state}
    } else {
        return rootReducer(state, action);
    }
}
const middleware = [thunk];
export const makeStore = () => configureStore({
    devTools: true,
    reducer,
    // preloadedState: initialState
}, composeWithDevTools(applyMiddleware(...middleware),));
export const wrapper = createWrapper(makeStore);


