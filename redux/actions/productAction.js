import * as t from '../types'
import axios from "axios";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import {API_HOST} from '@/consts'
import {CATEGORY_PRODUCTS__SUCCESS, CATEGORY_PRODUCTS_SUCCESS} from "../types";

export const listProducts = (keyword = '', sort = '', vendor = '', collection = '', material = '', color ='', size = '', priceLow='', priceUp='') =>
    async (dispatch) => {
        try {
            let filter = false
            if (keyword.indexOf('filter') !== -1) {
                filter = true
            }
            if (keyword && sort) {
                sort = '&sort=' + sort
            }
            else if (!keyword && sort) {
                sort = '?sort=' + sort
            }
            let filterColumn;
            if (keyword && keyword !== '/' || sort) {
                filterColumn = `&vendor=${vendor}&collection=${collection}&material=${material}&color=${color}&size=${size}&priceLow=${priceLow}&priceUp=${priceUp}`
            } else {
                filterColumn = `?vendor=${vendor}&collection=${collection}&material=${material}&color=${color}&size=${size}&priceLow=${priceLow}&priceUp=${priceUp}`
            }
            dispatch({type: t.PRODUCT_LIST_REQUEST});
            const {data} = await axios.get(`${API_HOST}/api/products${keyword}${sort}${filterColumn}`);
            data['filter'] = filter
            console.log(data)
            dispatch({
                type: t.PRODUCT_LIST_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: t.PRODUCT_LIST_FAIL,
                payload:
                    error.response && error.response.data.detail
                        ? error.response.data.detail
                        : error.message,
            });
        }
    };
export const listCatalog = () =>
    async (dispatch) => {
        try {
            dispatch({type: t.CATALOG_REQUEST});
            const {data} = await axios.get(`${API_HOST}/api/products/catalog/`);
            dispatch({
                type: t.CATALOG_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: t.CATALOG_FAIL,
                payload:
                    error.response && error.response.data.detail
                        ? error.response.data.detail
                        : error.message,
            });
        }
    };
export const listCategoryProducts = (category = '') =>
    async (dispatch) => {
        try {
            dispatch({type: t.CATEGORY_PRODUCTS_REQUEST});
            const {data} = await axios.get(`${API_HOST}/api/products/category/${category}`);
            dispatch({
                type: t.CATEGORY_PRODUCTS_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: t.CATEGORY_PRODUCTS_FAIL,
                payload:
                    error.response && error.response.data.detail
                        ? error.response.data.detail
                        : error.message,
            });
        }
    };

export const listTopProducts = (keyword = '') =>
    async (dispatch) => {
        try {
            dispatch({type: t.PRODUCT_TOP_REQUEST});
            const data = await axios.get(`${API_HOST}/api/products/top`);
            dispatch({
                type: t.PRODUCT_TOP_SUCCESS,
                payload: data.data,
            });
        } catch (error) {
            dispatch({
                type: t.PRODUCT_TOP_FAIL,
                payload:
                    error.response && error.response.data.detail
                        ? error.response.data.detail
                        : error.message,
            });
        }
    };
export const listSeenProducts = (oppenedItems = []) =>
    async (dispatch) => {
        try {
            dispatch({type: t.SEEN_PRODUCT_REQUEST});
            const sentData = {oppenedItems: oppenedItems}
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };
            const {data} = await axios.post(`${API_HOST}/api/products/seen`, sentData, config);
            dispatch({
                type: t.SEEN_PRODUCT_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: t.SEEN_PRODUCT_FAIL,
                payload:
                    error.response && error.response.data.detail
                        ? error.response.data.detail
                        : error.message,
            });
        }
    };
export const listProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({type: t.PRODUCT_DETAILS_REQUEST});
        const {data} = await axios.get(`${API_HOST}/api/products/${id}`);
        dispatch({
            type: t.PRODUCT_DETAILS_SUCCESS,
            payload: data,
        });

    } catch (error) {
        dispatch({
            type: t.PRODUCT_DETAILS_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
    let oldItems  = JSON.parse(localStorage.getItem('oppenedItems')) || []

    let isReplaced = false;

    let newItem = id; // id нового товара
    oldItems.map((item,i) => {
        if(Number(item) === Number(newItem)) {
            // новый товар уже есть в списке товаров - заменяем
            isReplaced = true;
        }
    })
    if (!isReplaced) {
        oldItems.push(Number(newItem))
    }
    localStorage.setItem('oppenedItems', JSON.stringify(oldItems));

};

export const deleteProduct = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: t.PRODUCT_DELETE_REQUEST,
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

        await axios.delete(`${API_HOST}/api/products/delete/${id}/`, config);

        dispatch({
            type: t.PRODUCT_DELETE_SUCCESS,
        });
    } catch (error) {
        dispatch({
            type: t.PRODUCT_DELETE_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
};

export const createProduct = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: t.PRODUCT_CREATE_REQUEST,
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

        const {data} = await axios.post(`${API_HOST}/api/products/create/`, {}, config);

        dispatch({
            type: t.PRODUCT_CREATE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: t.PRODUCT_CREATE_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
};

export const migrateProduct = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: t.PRODUCT_MIGRATE_REQUEST,
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

        const {data} = await axios.get(`${API_HOST}/migrate/`, {}, config);

        dispatch({
            type: t.PRODUCT_MIGRATE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: t.PRODUCT_MIGRATE_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
};

export const migrateUpdateProduct = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: t.PRODUCT_MIGRATE_UPDATE_REQUEST,
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

        const {data} = await axios.get(`${API_HOST}/update/`, {}, config);

        dispatch({
            type: t.PRODUCT_MIGRATE_UPDATE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: t.PRODUCT_MIGRATE_UPDATE_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
};

export const superSaleProduct = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: t.PRODUCT_MIGRATE_UPDATE_REQUEST,
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

        const {data} = await axios.get(`${API_HOST}/api/products/supersale/`, {}, config);

        dispatch({
            type: t.PRODUCT_MIGRATE_UPDATE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: t.PRODUCT_MIGRATE_UPDATE_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
};

export const updateProduct = (product) => async (dispatch, getState) => {
    try {
        dispatch({
            type: t.PRODUCT_UPDATE_REQUEST,
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
            `${API_HOST}/api/products/update/${product._id}/`,
            product,
            config
        );

        dispatch({
            type: t.PRODUCT_UPDATE_SUCCESS,
            payload: data,
        });

        dispatch({type: t.PRODUCT_DETAILS_SUCCESS, payload: data});
    } catch (error) {
        dispatch({
            type: t.PRODUCT_UPDATE_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
};

export const createProductReview =
    (productId, review) => async (dispatch, getState) => {
        try {
            dispatch({
                type: t.PRODUCT_CREATE_REVIEW_REQUEST,
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

            const {data} = await axios.post(
                `${API_HOST}/api/products/${productId}/reviews/`,
                review,
                config
            );

            dispatch({type: t.PRODUCT_CREATE_REVIEW_SUCCESS, payload: data});
        } catch (error) {
            dispatch({
                type: t.PRODUCT_CREATE_REVIEW_FAIL,
                payload:
                    error.response && error.response.data.detail
                        ? error.response.data.detail
                        : error.message,
            });
        }
    };
