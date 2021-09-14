import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from "../actions";

const cart_reducer = (state, action) => {
  const { type } = action;

  if (type === ADD_TO_CART) {
    const { id, color, amount, product } = action.payload;
    const tempItem = state.cart.find((item) => item.id === id + color);
    if (tempItem) {
      const newCart = state.cart.map((item) => {
        if (item.id === id + color) {
          let newAmount = item.amount + amount;
          if (newAmount > item.max) newAmount = item.max;
          return { ...item, amount: newAmount };
        } else {
          return item;
        }
      });

      return { ...state, cart: newCart };
    } else {
      const newItem = {
        id: id + color,
        name: product.name,
        color,
        amount,
        image: product.images[0].url,
        price: product.price,
        max: product.stock,
      };
      return { ...state, cart: [...state.cart, newItem] };
    }
  }

  if (type === REMOVE_CART_ITEM)
    return {
      ...state,
      cart: state.cart.filter((item) => item.id !== action.payload),
    };

  if (type === CLEAR_CART) return { ...state, cart: [] };

  if (type === TOGGLE_CART_ITEM_AMOUNT) {
    const { id, value } = action.payload;

    const newCart = state.cart.map((item) => {
      if (item.id === id) {
        if (value === "inc") {
          let newAmount = item.amount + 1;
          if (newAmount > item.max) newAmount = item.max;

          return { ...item, amount: newAmount };
        }
        if (value === "dec") {
          let newAmount = item.amount - 1;
          if (newAmount < 1) newAmount = 1;

          return { ...item, amount: newAmount };
        }
      }
      return item;
    });

    return { ...state, cart: newCart };
  }

  if (type === COUNT_CART_TOTALS) {
    const { totalAmount, totalItems } = state.cart.reduce(
      (total, item) => {
        const { price, amount } = item;
        total.totalItems += amount;
        total.totalAmount += price * amount;
        return total;
      },
      {
        totalItems: 0,
        totalAmount: 0,
      }
    );

    return { ...state, totalAmount, totalItems };
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default cart_reducer;
