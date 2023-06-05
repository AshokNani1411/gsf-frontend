import { 
  RETRIEVE_CARRIERS
} from "../../actions/types"

const initialState = []

function carrierReducer(carriers = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case RETRIEVE_CARRIERS:
      return payload

    default:
      return carriers
  }
}

export default carrierReducer