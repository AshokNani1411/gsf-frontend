import { RETRIEVE_PICKUP_REQUESTS, CREATE_PICKUP_REQUEST, DELETE_PICKUP_REQUEST } from "../../actions/types"

const initialState = []

function pickupRequestReducer(pickupRequests = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case RETRIEVE_PICKUP_REQUESTS:
      return payload

      case CREATE_PICKUP_REQUEST:
        return [...pickupRequests, payload]
      
      case DELETE_PICKUP_REQUEST:
        return pickupRequests.filter(({ XPICKID_0 }) => XPICKID_0 !== payload.id)

    default:
      return pickupRequests
  }
}

export default pickupRequestReducer