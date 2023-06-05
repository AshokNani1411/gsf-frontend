import { RETRIEVE_INVOICES } from "../../actions/types"

const initialState = []

function invoiceReducer(invoices = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case RETRIEVE_INVOICES:
      return payload

    default:
      return invoices
  }
}


export default invoiceReducer