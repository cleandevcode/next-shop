import * as T from "../types";
import { Product } from "../../typedefs";
import { HYDRATE } from "next-redux-wrapper";

interface State {
  product: Product[];
  selectedProduct: Number;
}

const initialState: State = {
  product: [],
  selectedProduct: -1
};

export default function (state = initialState, action) {
  switch (action.type) {
    case HYDRATE:
      return action.payload.product;
    case T.RECEIVE_PRODUCT:
      return { product: action.payload, selectedProduct: -1 };
    case T.SELECT_PRODUCT:
      return { ...state, selectedProduct: action.payloads };
    default:
      return state;
  }
}
