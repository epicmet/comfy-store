import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";

const filter_reducer = (state, action) => {
  const { type } = action;

  if (type === LOAD_PRODUCTS)
    return {
      ...state,
      allProducts: [...action.payload],
      filteredProducts: [...action.payload],
    };

  if (type === SET_GRIDVIEW) return { ...state, gridView: true };
  if (type === SET_LISTVIEW) return { ...state, gridView: false };

  if (type === UPDATE_SORT) return { ...state, sort: action.payload };

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
