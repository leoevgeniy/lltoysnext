import * as t from '../types'

// export const productListReducer = (state = {
//     productlist: {
//         loading: false,
//         products: [],
//         page: '100',
//         pages: '',
//         vendorlist: [],
//         collectionlist: [],
//         materiallist: [],
//         colorlist: [],
//         sizelist: [],
//         priceUpApi: '',
//         priceLowApi: '',
//         maxPrice: ''
//     }
// }, action) => {
//     switch (action.type) {
//         case t.PRODUCT_LIST_REQUEST:
//             return {loading: true, products: [ ]}
//         case t.PRODUCT_LIST_SUCCESS:
//             return {
//                 loading: false,
//                 products: action.payload.products,
//                 page: action.payload.page,
//                 pages: action.payload.pages,
//                 vendorlist: action.payload.vendorlist,
//                 collectionlist: action.payload.collectionlist,
//                 materiallist: action.payload.materiallist,
//                 colorlist: action.payload.colorlist,
//                 sizelist: action.payload.sizelist,
//                 priceUpApi: action.payload.priceUpApi,
//                 priceLowApi: action.payload.priceLowApi,
//                 maxPrice: action.payload.maxPrice
//             }
//         default:
//             return {...state}
//     }
// }
export const productListReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case t.PRODUCT_LIST_REQUEST :
            return { loading: true, products: [] };
        case t.PRODUCT_LIST_SUCCESS:
            return {
                loading: false,
                products: action.payload.products,
                page: action.payload.page,
                pages: action.payload.pages,
                filter: action.payload.filter,
                vendorList: action.payload.vendorList,
                collectionList: action.payload.collectionList,
                materialList: action.payload.materialList,
                colorList: action.payload.colorList,
                sizeList: action.payload.sizeList,
                priceUpApi: action.payload.priceUpApi,
                priceLowApi: action.payload.priceLowApi,
                maxPrice: action.payload.maxPrice
            };
        case t.PRODUCT_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
export const catalogReducer = (state = { catalog: {} }, action) => {
    switch (action.type) {
        case t.CATALOG_REQUEST:
            return { loading: true, catalog: {} };
        case t.CATALOG_SUCCESS:
            return {
                loading: false,
                catalog: action.payload,
            };
        case t.CATALOG_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const productDetailsReducer = (
    state = { product: { reviews: [] } },
    action
) => {
    switch (action.type) {
        case t.PRODUCT_DETAILS_REQUEST:
            return { loading: true, ...state };
        case t.PRODUCT_DETAILS_SUCCESS:
            return { loading: false, product: action.payload };
        case t.PRODUCT_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        case t.PRODUCT_DETAILS_RESET:
            return {};
        default:
            return state;
    }
};

export const productDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case t.PRODUCT_DELETE_REQUEST:
            return { loading: true };
        case t.PRODUCT_DELETE_SUCCESS:
            return { loading: false, success: true };
        case t.PRODUCT_DELETE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const productCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case t.PRODUCT_CREATE_REQUEST:
            return { loading: true };
        case t.PRODUCT_CREATE_SUCCESS:
            return { loading: false, success: true, product: action.payload };
        case t.PRODUCT_CREATE_FAIL:
            return { loading: false, error: action.payload };
        case t.PRODUCT_CREATE_RESET:
            return {};
        default:
            return state;
    }
};

export const productMigrateReducer = (state = {}, action) => {
    switch (action.type) {
        case t.PRODUCT_MIGRATE_REQUEST:
            return { loading: true };
        case t.PRODUCT_MIGRATE_SUCCESS:
            return { loading: false, success: true};
        case t.PRODUCT_MIGRATE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const productMigrateUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case t.PRODUCT_MIGRATE_UPDATE_REQUEST:
            return { loading: true };
        case t.PRODUCT_MIGRATE_UPDATE_SUCCESS:
            return { loading: false, success: true};
        case t.PRODUCT_MIGRATE_UPDATE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
export const productUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case t.PRODUCT_UPDATE_REQUEST:
            return { loading: true };
        case t.PRODUCT_UPDATE_SUCCESS:
            return { loading: false, success: true, product: action.payload };
        case t.PRODUCT_UPDATE_FAIL:
            return { loading: false, error: action.payload };
        case t.PRODUCT_UPDATE_RESET:
            return { product: {} };
        default:
            return state;
    }
};

export const productReviewCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case t.PRODUCT_CREATE_REVIEW_REQUEST:
            return { loading: true };
        case t.PRODUCT_CREATE_REVIEW_SUCCESS:
            return { loading: false, success: true };
        case t.PRODUCT_CREATE_REVIEW_FAIL:
            return { loading: false, error: action.payload };
        case t.PRODUCT_CREATE_REVIEW_RESET:
            return {};
        default:
            return state;
    }
};

export const productTopRatedReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case t.PRODUCT_TOP_REQUEST:
            return { loading: true, products: [] };
        case t.PRODUCT_TOP_SUCCESS:
            return { loading: false, products: action.payload };
        case t.PRODUCT_TOP_FAIL:
            return { loading: false, error: action.payload };
        case t.PRODUCT_TOP_RESET:
            return {}
        default:
            return state;
    }
};
export const productSeenReducer = (state = { productsSeen :{products: [] }}, action) => {
    switch (action.type) {
        case t.SEEN_PRODUCT_REQUEST:
            return { loading: true, products: [] };
        case t.SEEN_PRODUCT_SUCCESS:
            return { loading: false, products: action.payload };
        case t.SEEN_PRODUCT_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

