import { RETRIEVE_CUSTOMERS } from "../../actions/types"

const initialState = []

function customerReducer(customers = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case RETRIEVE_CUSTOMERS:
      return payload

    default:
      return customers
  }
}

export default customerReducer