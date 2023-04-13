import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
    ORDER_CREATE_RESET,
    P5S_ORDER_CREATE_REQUEST,
    P5S_ORDER_CREATE_SUCCESS,
    P5S_ORDER_CREATE_FAIL,
    P5S_ORDER_CREATE_RESET,
    P5S_DETAILS_REQUEST,
    P5S_DETAILS_SUCCESS,
    P5S_DETAILS_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_PAYMENT_REQUEST,
    ORDER_PAYMENT_SUCCESS,
    ORDER_PAYMENT_FAIL,
    ORDER_PAYMENT_DETAILS_REQUEST,
    ORDER_PAYMENT_DETAILS_SUCCESS,
    ORDER_PAYMENT_DETAILS_FAIL,
    ORDER_PAY_RESET,
    ORDER_LIST_MY_REQUEST,
    ORDER_LIST_MY_SUCCESS,
    ORDER_LIST_MY_FAIL,
    ORDER_LIST_MY_RESET,
    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_FAIL,
    ORDER_SHIPPMENT_COST_REQUEST,
    ORDER_SHIPPMENT_COST_SUCCESS,
    ORDER_SHIPPMENT_COST_FAIL,
    ORDER_SHIPPMENT_COST_RESET,
    ORDER_DELIVER_REQUEST,
    ORDER_DELIVER_SUCCESS,
    ORDER_DELIVER_FAIL,
    ORDER_DELIVER_RESET,
} from "../../../../lltoys.ru/frontend/src/constants/orderContants";


export const orderCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_CREATE_REQUEST:
            return {
                loading: true,
            };
        case ORDER_CREATE_SUCCESS:
            return {
                loading: false,
                success: true,
                order: action.payload,
            };
        case ORDER_CREATE_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        case ORDER_CREATE_RESET:
            return {};

        default:
            return state;
    }
};
export const p5sOrderCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case P5S_ORDER_CREATE_REQUEST:
            return {
                loading: true,
            };
        case P5S_ORDER_CREATE_SUCCESS:
            return {
                loading: false,
                success: true,
                order: action.payload,
            };
        case P5S_ORDER_CREATE_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        case P5S_ORDER_CREATE_RESET:
            return {};

        default:
            return state;
    }
};
export const orderDetailsReducer = (
    state = {loading: true, orderItems: [], shippingAdress: {}},
    action
) => {
    switch (action.type) {
        case ORDER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case ORDER_DETAILS_SUCCESS:
            return {
                loading: false,
                order: action.payload,
            };
        case ORDER_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};
export const p5sDetailsReducer = (
    state = {loading: true},
    action
) => {
    switch (action.type) {
        case P5S_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case P5S_DETAILS_SUCCESS:
            return {
                loading: false,
                p5sOrder: action.payload,
            };
        case P5S_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};
export const orderShippmentCostReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_SHIPPMENT_COST_REQUEST:
            return {
                loading: true,
            };
        case ORDER_SHIPPMENT_COST_SUCCESS:
            return {
                loading: false,
                success: true,
            };
        case ORDER_SHIPPMENT_COST_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        case ORDER_SHIPPMENT_COST_RESET:
            return {};
        default:
            return state;
    }
};

//
export const orderPayReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_PAY_REQUEST:
            return {
                loading: true,
            };
        case ORDER_PAY_SUCCESS:
            return {
                loading: false,
                success: true,
            };
        case ORDER_PAY_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        case ORDER_PAY_RESET:
            return {};
        default:
            return state;
    }
};
export const orderPaymentReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_PAYMENT_REQUEST:
            return {
                loading: true,
            };
        case ORDER_PAYMENT_SUCCESS:
            return {
                loading: false,
                success: true,
                response: action.payload
            };
        case ORDER_PAYMENT_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};
export const orderPaymentDetailsReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_PAYMENT_DETAILS_REQUEST:
            return {
                loading: true,
            };
        case ORDER_PAYMENT_DETAILS_SUCCESS:
            return {
                loading: false,
                success: true,
                response: action.payload
            };
        case ORDER_PAYMENT_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};
//
export const orderDeliverReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_DELIVER_REQUEST:
            return {
                loading: true,
            };
        case ORDER_DELIVER_SUCCESS:
            return {
                loading: false,
                success: true,
            };
        case ORDER_DELIVER_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        case ORDER_DELIVER_RESET:
            return {};

        default:
            return state;
    }
};

export const orderListMyReducer = (state = {orders: []}, action) => {
    switch (action.type) {
        case ORDER_LIST_MY_REQUEST:
            return {
                loading: true,
            };
        case ORDER_LIST_MY_SUCCESS:
            return {
                loading: false,
                orders: action.payload,
            };
        case ORDER_LIST_MY_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        case ORDER_LIST_MY_RESET:
            return {
                orders: [],
            };

        default:
            return state;
    }
};

export const orderListReducer = (state = {orders: []}, action) => {
    switch (action.type) {
        case ORDER_LIST_REQUEST:
            return {
                loading: true,
            };
        case ORDER_LIST_SUCCESS:
            return {
                loading: false,
                orders: action.payload,
            };
        case ORDER_LIST_FAIL:
            return {
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};
