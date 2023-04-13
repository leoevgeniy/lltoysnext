import {applyMiddleware, createStore} from 'redux';
import rootReducer from "@/redux/reducers/rootReducer";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
// const cartItemsFromStorage = typeof window ? window.localStorage.getItem("cartItems")
//     ? JSON.parse(localStorage.getItem("cartItems"))
//     : [] : [];
//
// const oppenedItemsFromStorage = window.localStorage.getItem('oppenedItems')
//     ? JSON.parse(localStorage.getItem("oppenedItems"))
//     : [];
//
// const userInfoFromStorage = window.localStorage.getItem("userInfo")
//     ? JSON.parse(localStorage.getItem("userInfo"))
//     : null;
//
// const shippingAddressFromStorage = window.localStorage.getItem("shippingAddress")
//     ? JSON.parse(localStorage.getItem("shippingAddress"))
//     : {};
//


const getStoreLocal = (item) => {
    if (typeof localStorage !== 'undefined') {
        return localStorage.getItem(item);
    }
    return null;
}
const initialState = {
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

export default store

