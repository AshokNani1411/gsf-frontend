import { RETRIEVE_SERVICE_REQUESTS, CREATE_SERVICE_REQUEST, DELETE_SERVICE_REQUEST } from "../../actions/types"

const initialState = []

function serviceRequestReducer(serviceRequests = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case RETRIEVE_SERVICE_REQUESTS:
      return payload

    case CREATE_SERVICE_REQUEST:
      return [...serviceRequests, payload]
    
    case DELETE_SERVICE_REQUEST:
      return serviceRequests.filter(({ SRENUM_0 }) => SRENUM_0 !== payload.id)

    default:
      return serviceRequests
  }
}

export default serviceRequestReducer