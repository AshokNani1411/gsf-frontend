import { RETRIEVE_PRODUCT_CONSUMPTIONS } from "../../actions/types"

const initialState = []

function productConsumptionsReducer(productConsumptions = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case RETRIEVE_PRODUCT_CONSUMPTIONS:
      return payload

    default:
      return productConsumptions
  }
}

export default productConsumptionsReducer