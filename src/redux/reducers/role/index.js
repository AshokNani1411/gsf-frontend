import { RETRIEVE_ROLES } from "../../actions/types"

const initialState = []

function roleReducer(roles = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case RETRIEVE_ROLES:
      return payload

    default:
      return roles
  }
}

export default roleReducer