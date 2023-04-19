import axios from "axios";
import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
    P5S_ORDER_CREATE_REQUEST,
    P5S_ORDER_CREATE_SUCCESS,
    P5S_ORDER_CREATE_FAIL,
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
    ORDER_LIST_MY_REQUEST,
    ORDER_LIST_MY_SUCCESS,
    ORDER_LIST_MY_FAIL,
    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_FAIL,
    ORDER_DELIVER_REQUEST,
    ORDER_DELIVER_SUCCESS,
    ORDER_DELIVER_FAIL,
    P5S_ORDER_CREATE_RESET,

} from "@/redux/typesOrders";

import {CART_CLEAR_ITEMS} from "@/redux/typesCart";
import {API_HOST} from "@/consts";

export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_CREATE_REQUEST,
        });

        const {
            userLogin: {userInfo},
        } = getState();
        console.log(userInfo.token)
        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const {data} = await axios.post(`${API_HOST}/api/order/add/`, order, config);
        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data,
        });
        dispatch({
            type: CART_CLEAR_ITEMS,
            payload: data,
        });

        localStorage.removeItem("cartItems");
    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
};
export const p5sCreateOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({
            type: P5S_ORDER_CREATE_REQUEST,
        });

        const {
            userLogin: {userInfo},
        } = getState();

        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const {data} = await axios.post(`${API_HOST}/api/order/p5s/`, order, config);

        dispatch({
            type: P5S_ORDER_CREATE_SUCCESS,
            payload: order,
        });

    } catch (error) {
        dispatch({
            type: P5S_ORDER_CREATE_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
};

export const getOrderDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_DETAILS_REQUEST,
        });

        const {
            userLogin: {userInfo},
        } = getState();

        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const {data} = await axios.get(`${API_HOST}/api/order/${id}/`, config);

        // const {deliveryData} = await axios.get(`/api/order/p5sdetails/${id}`, config)
        // Object.assign(data, deliveryData)
        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
};
export const p5sgetOrderDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: P5S_DETAILS_REQUEST,
        });

        const {
            userLogin: {userInfo},
        } = getState();

        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const {data} = await axios.get(`${API_HOST}/api/order/p5sdetails/${id}`, config)

        dispatch({
            type: P5S_DETAILS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: P5S_DETAILS_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
};
export const payOrderRequest = (order, userDetails, url, callback) => async (dispatch, getState) => {
    try {
        const id = order._id
        dispatch({
            type: ORDER_PAYMENT_REQUEST,
        });

        const {
            userLogin: {userInfo},
        } = getState();

        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const body = {
            order,
            userDetails,
            url
        }
        const {data} = await axios.post(
            `${API_HOST}/api/order/${id}/paymentrequest/`,
            body,
            config
        );
        dispatch({
            type: ORDER_PAYMENT_SUCCESS,
            payload: data,
        });

        callback()
    } catch (error) {
        dispatch({
            type: ORDER_PAYMENT_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
};
export const payOrderDetails = (order, userDetails) => async (dispatch, getState) => {
    try {
        const id = order._id
        dispatch({
            type: ORDER_PAYMENT_DETAILS_REQUEST,
        });

        const {
            userLogin: {userInfo},
        } = getState();

        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const body = {
            order,
            userDetails,
        }
        const {data} = await axios.post(
            `${API_HOST}/api/order/${id}/paymentdetails/`,
            body,
            config
        );
        dispatch({
            type: ORDER_PAYMENT_DETAILS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: ORDER_PAYMENT_DETAILS_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
};
export const payOrder = (id, paymentResult) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_PAY_REQUEST,
        });

        const {
            userLogin: {userInfo},
        } = getState();

        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const {data} = await axios.put(
            `${API_HOST}/api/order/${id}/pay/`,
            paymentResult,
            config
        );

        dispatch({
            type: ORDER_PAY_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: ORDER_PAY_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
};

export const deliverOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_DELIVER_REQUEST,
        });

        const {
            userLogin: {userInfo},
        } = getState();

        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const {data} = await axios.put(
            `${API_HOST}/api/order/${order._id}/deliver/`,
            {},
            config
        );

        dispatch({
            type: ORDER_DELIVER_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: ORDER_DELIVER_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
};

export const listMyOrders = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_LIST_MY_REQUEST,
        });

        const {
            userLogin: {userInfo},
        } = getState();

        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const {data} = await axios.get(`${API_HOST}/api/order/myorders/`, config);

        dispatch({
            type: ORDER_LIST_MY_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: ORDER_LIST_MY_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
};

export const listOrders = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_LIST_REQUEST,
        });

        const {
            userLogin: {userInfo},
        } = getState();

        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const {data} = await axios.get(`${API_HOST}/api/order/`, config);

        dispatch({
            type: ORDER_LIST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: ORDER_LIST_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
};
