import { RETRIEVE_SUPPLIER_CONCODE } from "../../actions/types"

const initialState = []

function supplierConCodeReducer(supplierConCodes = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case RETRIEVE_SUPPLIER_CONCODE:
      return payload

    default:
      return supplierConCodes
  }
}

export default supplierConCodeReducer