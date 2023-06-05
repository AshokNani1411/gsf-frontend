import { RETRIEVE_SOCART_REQUESTS, CREATE_SOCART_REQUEST, DELETE_SOCART_REQUEST } from "../../actions/types"

const initialState = []

function soCartReducer(soCart = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case RETRIEVE_SOCART_REQUESTS:
      return payload

    case CREATE_SOCART_REQUEST:
      return [...soCart, payload]

    case DELETE_SOCART_REQUEST:
      return [...soCart, payload]

    default:
      return soCart
  }
}

export default soCartReducer