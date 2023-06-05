import { RETRIEVE_DESIGNATIONS } from "../../actions/types"

const initialState = []

function designationReducer(designations = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case RETRIEVE_DESIGNATIONS:
      return payload

    default:
      return designations
  }
}

export default designationReducer