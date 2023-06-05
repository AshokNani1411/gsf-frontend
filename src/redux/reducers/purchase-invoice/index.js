import { RETRIEVE_PURCHASE_INVOICES } from "../../actions/types"

const initialState = []

function purchaseInvoiceReducer(purchaseInvoices = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case RETRIEVE_PURCHASE_INVOICES:
      return payload

    default:
      return purchaseInvoices
  }
}

export default purchaseInvoiceReducer