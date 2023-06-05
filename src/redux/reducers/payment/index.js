import { RETRIEVE_PAYMENTS } from "../../actions/types"

const initialState = []

function paymentReducer(payments = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case RETRIEVE_PAYMENTS:
      return payload

    default:
      return payments
  }
}

export default paymentReducer