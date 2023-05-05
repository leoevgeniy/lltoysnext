import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_SAVE_SHIPPING_ADDRESS,
    CART_SAVE_PAYMENT_METHOD,
    CART_CLEAR_ITEMS,
    CART_SAVE_SHIPPING_COST,
    CART_SAVE_SHIPPING_COST_RESET,
} from '@/redux/typesCart'


export const cartReducer = (state={cartItems:[], itemsList:[], shippingAddress : {}}, action) => {
    switch(action.type){
        case CART_ADD_ITEM:
            const item = action.payload
            const existItem = state.cartItems.find((x, i) =>
                i === item.ind
            )
            // const existSizeChange = state.cartItems.find((x, i) => i===item.ind)
            if (existItem) {
                return{
                    ...state,
                    cartItems: state.cartItems.map((x, i) =>
                        i === item.ind ? item : x)
                }
            // } else if (item.ind!=='undefined') {
            //     return{
            //         ...state,
            //         cartItems: state.cartItems.map(x =>
            //             x.product === existSizeChange.product ? item : x)
            //     }
            } else
            {
                return{
                    ...state,
                    // itemsList: [...state.itemsList, item.product],
                    cartItems:[...state.cartItems, item]
                }
            }

        case CART_REMOVE_ITEM:

            return {
                ...state,
                // itemsList: state.itemsList.filter((x) => x.product !== action.payload.product),
                cartItems: state.cartItems.filter((x, ind) => ind !== action.payload[0])
            }
        
        case CART_SAVE_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress:action.payload
            }

        case CART_SAVE_SHIPPING_COST:
            return  {
                ...state,
                shippingPrice:action.payload
            }
        case CART_SAVE_SHIPPING_COST_RESET:
            return  {
                ...state,
                shippingPrice:0
            }

        case CART_SAVE_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: action.payload
            }
        case CART_CLEAR_ITEMS:
            return {
                ...state,
                cartItems: []
            }
        default:
            return state
    }
}