import { RETRIEVE_DROP_REQUESTS, CREATE_DROP_REQUEST, DELETE_DROP_REQUEST } from "../../actions/types"

const initialState = []

function dropRequestReducer(dropRequests = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case RETRIEVE_DROP_REQUESTS:
      return payload

    case CREATE_DROP_REQUEST:
      return [...dropRequests, payload]
    
    case DELETE_DROP_REQUEST:
      return dropRequests.filter(({ XDROPID_0 }) => XDROPID_0 !== payload.id)

    default:
      return dropRequests
  }
}

export default dropRequestReducer