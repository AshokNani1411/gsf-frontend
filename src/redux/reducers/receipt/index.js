import { RETRIEVE_RECEIPTS } from "../../actions/types"

const initialState = []

function receiptReducer(receiptRequests = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case RETRIEVE_RECEIPTS:
      return payload

    default:
      return receiptRequests
  }
}

export default receiptReducer