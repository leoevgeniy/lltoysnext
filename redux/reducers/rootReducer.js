import {
    productListReducer,
    catalogReducer,
    productDetailsReducer,
    productDeleteReducer,
    productCreateReducer,
    productUpdateReducer,
    productReviewCreateReducer,
    productTopRatedReducer,
    productSeenReducer,
    productMigrateReducer,
    productMigrateUpdateReducer,
} from "@/redux/reducers/productReducer";
import {cartReducer} from "@/redux/reducers/cartReducers";
import {
    userLoginReducer,
    userRegisterReducer,
    userDetailsReducer,
    userUpdateProfileReducer,
    userListReducer,
    userDeleteReducer,
    userUpdateReducer,
} from "@/redux/reducers/userReducers";
import {
    orderCreateReducer,
    orderDetailsReducer,
    orderPayReducer,
    orderPaymentReducer,
    orderDeliverReducer,
    orderListMyReducer,
    orderListReducer,
    p5sOrderCreateReducer,
    orderPaymentDetailsReducer, p5sDetailsReducer,
} from "@/redux/reducers/orderReducers";
import {combineReducers} from "redux";

const rootReducer = combineReducers({
    productList: productListReducer,
    catalogList: catalogReducer,
    productDetails: productDetailsReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productMigrate: productMigrateReducer,
    productMigrateUpdate: productMigrateUpdateReducer,
    productUpdate: productUpdateReducer,
    productReviewCreate: productReviewCreateReducer,
    productsTopRated: productTopRatedReducer,
    productsSeen: productSeenReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    usersList: userListReducer,
    userUpdate: userUpdateReducer,
    userDelete: userDeleteReducer,
    p5sOrderCreate: p5sOrderCreateReducer,
    p5sDetails: p5sDetailsReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    paymentRequest: orderPaymentReducer,
    paymentDetailsRequest: orderPaymentDetailsReducer,
    orderDeliver: orderDeliverReducer,
    orderListMy: orderListMyReducer,
    orderList: orderListReducer,
})

export default rootReducer;