import axios from "axios";
import * as t from "../typesUsers";
import { ORDER_LIST_MY_RESET } from "../typesOrders";

export const phoneLogin = (phone, password) => async (dispatch) => {
    try {
        dispatch({
            type: t.USER_LOGIN_REQUEST,
        });

        const config = {
            headers: {
                "Content-type": "application/json",
            },
        };

        const { data } = await axios.post(
            "/api/users/login/",
            { phone_number: phone},
            config
        );
        if (data['detail']) {
            dispatch({
                type: t.USER_LOGIN_FAIL,
                payload: data['detail']

            });
        } else {
            dispatch({
                type: t.USER_LOGIN_SUCCESS,
                payload: data,
            });

            localStorage.setItem("userInfo", JSON.stringify(data));
        }
    } catch (error) {
        dispatch({
            type: t.USER_LOGIN_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }

}

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: t.USER_LOGIN_REQUEST,
        });

        const config = {
            headers: {
                "Content-type": "application/json",
            },
        };

        const { data } = await axios.post(
            "/api/users/login/",
            { username: email, password: password },
            config
        );
        dispatch({
            type: t.USER_LOGIN_SUCCESS,
            payload: data,
        });

        localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: t.USER_LOGIN_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
};

export const logout = () => (dispatch) => {
    localStorage.removeItem("userInfo");
    dispatch({ type: t.USER_LOGOUT });
    dispatch({ type: t.USER_DETAILS_RESET });
    dispatch({ type: t.USER_LIST_RESET });
    dispatch({ type: ORDER_LIST_MY_RESET });
};

export const register = (name, email, password, phone_number) => async (dispatch) => {
    try {
        dispatch({
            type: t.USER_REGISTER_REQUEST,
        });

        const config = {
            headers: {
                "Content-type": "application/json",
            },
        };

        const { data } = await axios.post(
            "/api/users/register/",
            { name: name, email: email, password: password, phone_number: phone_number },
            config
        );
        dispatch({
            type: t.USER_REGISTER_SUCCESS,
            payload: data,
        });
        dispatch({
            type: t.USER_LOGIN_SUCCESS,
            payload: data,
        });

        localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: t.USER_REGISTER_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
};

export const getUserDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: t.USER_DETAILS_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.get(`/api/users/${id}/`, config);

        dispatch({
            type: t.USER_DETAILS_SUCCESS,
            payload: data,
        });

    } catch (error) {
        dispatch({
            type: t.USER_DETAILS_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
};

export const updateUserProfile = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: t.USER_UPDATE_PROFILE_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.put(
            `/api/users/profile/update/`,
            user,
            config
        );

        dispatch({
            type: t.USER_UPDATE_PROFILE_SUCCESS,
            payload: data,
        });
        dispatch({
            type: t.USER_LOGIN_SUCCESS,
            payload: data,
        });

        localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: t.USER_UPDATE_PROFILE_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
};

export const listUsers = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: t.USER_LIST_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.get(`/api/users/`, config);

        dispatch({
            type: t.USER_LIST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: t.USER_LIST_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
};

export const deleteUser = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: t.USER_DELETE_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.delete(`/api/users/delete/${id}`, config);

        dispatch({
            type: t.USER_DELETE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: t.USER_DELETE_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
};

export const updateUser = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: t.USER_UPDATE_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.put(
            `/api/users/update/${user._id}/`,
            user,
            config
        );

        dispatch({
            type: t.USER_UPDATE_SUCCESS,
        });

        dispatch({
            type: t.USER_DETAILS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: t.USER_UPDATE_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
};
