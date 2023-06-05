import { RETRIEVE_CUSTOMER_CONCODE } from "../../actions/types"

const initialState = []

function customerConCodeReducer(conCodes = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case RETRIEVE_CUSTOMER_CONCODE:
      return payload

    default:
      return conCodes
  }
}

export default customerConCodeReducer