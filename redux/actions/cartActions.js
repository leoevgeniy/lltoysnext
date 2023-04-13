import axios from 'axios'
import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_SAVE_SHIPPING_ADDRESS,
    CART_SAVE_SHIPPING_COST,
    CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_COST_RESET
} from '../constants/cartConstants'
import isWebColor from "react-native-web/dist/modules/isWebColor";

export const addToCart = (id, qty, color, size, ind, discount) => async (dispatch, getState) => {
    const {data} = await axios.get(`/api/products/${id}`)
    let countInStock = 0
    let aID = 0
    if (data.assortiment.length === 1 && !data.assortiment[0].color && !data.assortiment[0].size) {
        countInStock = data.assortiment[0].countInStock
        aID = data.assortiment[0].aID
    } else {
        data.assortiment.forEach(item => {
            if (item.color && item.size) {
                if (item.color === color && item.size.includes(size)) {
                    countInStock = item.countInStock
                    aID = item.aID
                }
            } else if (!item.color && item.size) {
                if (item.size.includes(size)) {
                    countInStock = item.countInStock
                    aID = item.aID
                }
            } else if (item.color && !item.size) {
                if (item.color === color) {
                    countInStock = item.countInStock
                    aID = item.aID
                }
            }
        })
    }
    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            product: data._id,
            assortiment: data.assortiment,
            size: size,
            color: color,
            colors: data.colors,
            name: data.name,
            image: data.imageSmall,
            price: Number(data.retailPrice).toFixed(0),
            discountPrice : (Number(data.retailPrice).toFixed(0) * (1 - discount)).toFixed(0),
            countInStock,
            aID,
            qty,
            ind
        }
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id, size) => (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: [id, size],

    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const saveShippingAddress = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload: data,

    })
    localStorage.setItem('shippingAddress', JSON.stringify(data))
}

export const saveShippingCost = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_SHIPPING_COST,
        payload: data,

    })
    localStorage.setItem('shippingAddress', JSON.stringify(data))
}
export const resetShippingCost = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_SHIPPING_COST_RESET,
        payload: data,

    })
    localStorage.setItem('shippingAddress', JSON.stringify(data))
}

export const savePaymentMethod = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_PAYMENT_METHOD,
        payload: data,

    })
    localStorage.setItem('paymentMethod', JSON.stringify(data))
}