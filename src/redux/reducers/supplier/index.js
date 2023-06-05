import { RETRIEVE_SUPPLIERS } from "../../actions/types"

const initialState = []

function supplierReducer(suppliers = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case RETRIEVE_SUPPLIERS:
      return payload

    default:
      return suppliers
  }
}

export default supplierReducer