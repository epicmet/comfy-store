import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from "../actions";

const products_reducer = (state, action) => {
  const { type } = action;

  if (type === SIDEBAR_OPEN) return { ...state, isSidebarOpen: true };
  if (type === SIDEBAR_CLOSE) return { ...state, isSidebarOpen: false };

  if (type === GET_PRODUCTS_BEGIN) return { ...state, productsLoading: true };
  if (type === GET_PRODUCTS_SUCCESS)
    return {
      ...state,
      products: action.payload,
      featuredProducts: action.payload.filter(
        (product) => product.featured === true
      ),
      productsLoading: false,
    };
  if (type === GET_PRODUCTS_ERROR)
    return { ...state, productsError: true, productsLoading: false };

  if (type === GET_SINGLE_PRODUCT_BEGIN)
    return { ...state, singleProductLoading: true, singleProductError: false };
  if (type === GET_SINGLE_PRODUCT_SUCCESS)
    return {
      ...state,
      singleProductLoading: false,
      singleProduct: action.payload,
    };
  if (type === GET_SINGLE_PRODUCT_ERROR)
    return { ...state, singleProductError: true, singleProductLoading: true };

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default products_reducer;
