import { RECEIVE_PRODUCT, SELECT_PRODUCT } from "store/types";

export const selectPerson = (id: Number) => ({
  type: SELECT_PRODUCT,
  payload: id
});

export const fetchProduct = () => {
  return async dispatch => {
    const payload = await (await fetchProductsSync()).json()
    return dispatch(receiveProduct(payload));

  };
};

export const receiveProduct = people => ({
  type: RECEIVE_PRODUCT,
  payload: people
});

export const fetchProductsSync = async () =>
  await fetch("https://fakestoreapi.com/products");

