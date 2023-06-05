import { RETRIEVE_INVOICES_OPEN_PAYMENTS } from "../../actions/types"

const initialState = []

function paymentInvoicesReducer(paymentInvoices = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case RETRIEVE_INVOICES_OPEN_PAYMENTS:
      return payload

    default:
      return paymentInvoices
  }
}


export default paymentInvoicesReducer