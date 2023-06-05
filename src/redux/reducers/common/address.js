import { 
  RETRIEVE_ADDRESSES
} from "../../actions/types"

const initialState = []

function addressReducer(addresses = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case RETRIEVE_ADDRESSES:
      return payload

    default:
      return addresses
  }
}

export default addressReducer