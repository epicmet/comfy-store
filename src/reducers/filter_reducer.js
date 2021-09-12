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
      filters: {
        ...state.filters,
        maxPrice: Math.max(...action.payload.map((p) => p.price)),
        price: Math.max(...action.payload.map((p) => p.price)),
      },
    };

  if (type === SET_GRIDVIEW) return { ...state, gridView: true };
  if (type === SET_LISTVIEW) return { ...state, gridView: false };

  if (type === UPDATE_SORT) return { ...state, sort: action.payload };

  if (type === SORT_PRODUCTS) {
    const { sort, filteredProducts } = state;
    let tempProducts = [...filteredProducts];

    if (sort === "price-lowest") {
      tempProducts = tempProducts.sort((a, b) => a.price - b.price);
    }
    if (sort === "price-highest") {
      tempProducts = tempProducts.sort((a, b) => b.price - a.price);
    }
    if (sort === "name-a") {
      tempProducts = tempProducts.sort((a, b) => a.name.localeCompare(b.name));
    }
    if (sort === "name-z") {
      tempProducts = tempProducts.sort((a, b) => b.name.localeCompare(a.name));
    }

    return { ...state, filteredProducts: tempProducts };
  }

  if (type === UPDATE_FILTERS)
    return {
      ...state,
      filters: {
        ...state.filters,
        [action.payload.name]: action.payload.value,
      },
    };

  if (type === FILTER_PRODUCTS) {
    let newProducts = [...state.allProducts];

    const { text, category, company, color, price, shipping } = state.filters;

    if (text) {
      newProducts = newProducts.filter((product) =>
        product.name.toLowerCase().startsWith(text)
      );
    }

    if (category !== "all") {
      newProducts = newProducts.filter(
        (product) => product.category === category
      );
    }

    if (company !== "all") {
      newProducts = newProducts.filter(
        (product) => product.company === company
      );
    }

    if (color !== "all") {
      newProducts = newProducts.filter((product) =>
        product.colors.find((c) => c === color)
      );
    }

    // Price
    newProducts = newProducts.filter((product) => product.price <= price);

    if (shipping) {
      newProducts = newProducts.filter((product) => product.shipping === true);
    }

    return { ...state, filteredProducts: newProducts };
  }

  if (type === CLEAR_FILTERS)
    return {
      ...state,
      filters: {
        ...state.filters,
        text: "",
        company: "all",
        category: "all",
        color: "all",
        price: state.filters.maxPrice,
        shipping: false,
      },
    };

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
