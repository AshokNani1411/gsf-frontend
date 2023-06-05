import { RETRIEVE_RETURNS } from "../../actions/types"

const initialState = []

function returnReducer(returns = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case RETRIEVE_RETURNS:
      return payload

    default:
      return returns
  }
}

export default returnReducer