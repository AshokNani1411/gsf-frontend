import { RETRIEVE_PRODUCTS } from "../../actions/types"

const initialState = []

function productReducer(products = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case RETRIEVE_PRODUCTS:
      return payload


    default:
      return products
  }
}

export default productReducer