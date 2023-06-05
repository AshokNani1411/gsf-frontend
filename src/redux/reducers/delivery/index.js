import { RETRIEVE_DELIVERIES } from "../../actions/types"

const initialState = []

function deliveryReducer(deliveries = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case RETRIEVE_DELIVERIES:
      return payload

    default:
      return deliveries
  }
}

export default deliveryReducer