import { RETRIEVE_ORDERS } from "../../actions/types"

const initialState = []

function orderReducer(orders = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case RETRIEVE_ORDERS:
      return payload

    default:
      return orders
  }
}

export default orderReducer