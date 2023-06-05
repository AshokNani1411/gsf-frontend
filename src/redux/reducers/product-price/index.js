import { RETRIEVE_PRODUCTS_PRICE } from "../../actions/types"

const initialState = []

function productsPriceReducer(productsPrice = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case RETRIEVE_PRODUCTS_PRICE:
      return payload
      

    default:
      return productsPrice
  }
}

export default productsPriceReducer