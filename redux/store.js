import {applyMiddleware, createStore} from 'redux';
import rootReducer from "@/redux/reducers/rootReducer";
import {createWrapper, Context } from "next-redux-wrapper";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import {configureStore} from "@reduxjs/toolkit";

const getStoreLocal = (item) => {
    if (typeof localStorage !== 'undefined') {
        return localStorage.getItem(item);
    }
    return null;
}
const makeStore = () => configureStore({
    reducer: {rootReducer},
    devTools: true
})

export const wrapper = createWrapper(makeStore)

export const initialState = {
    cart: {
        cartItems: JSON.parse(getStoreLocal("cartItems")),
        shippingAddress: JSON.parse(getStoreLocal("shippingAddress")),
    },
    userLogin: {userInfo: JSON.parse(getStoreLocal("userInfo"))},
    productsSeen: {oppenedItems: JSON.parse(getStoreLocal("oppenedItems"))}
};

const middleware = [thunk];

const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))


// export const makeStore  = () => configureStore(rootReducer)
// const store = createWrapper(makeStore)
// export const wrapper = createWrapper(store, { debug: true });

export default store

