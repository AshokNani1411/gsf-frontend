import { RETRIEVE_PURCHASE_ORDERS } from "../../actions/types"

const initialState = []

function purchaseOrderReducer(orders = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case RETRIEVE_PURCHASE_ORDERS:
      return payload

    default:
      return orders
  }
}

export default purchaseOrderReducer