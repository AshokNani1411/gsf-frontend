import {
  RETRIEVE_DELIVERY_MODES
} from "../../actions/types"

const initialState = []

function deliverModeReducer(deliveryModes = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case RETRIEVE_DELIVERY_MODES:
      return payload

    default:
      return deliveryModes
  }
}

export default deliverModeReducer