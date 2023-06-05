import { RETRIEVE_INSTALL_BASE } from "../../actions/types"

const initialState = []

function InstallBaseReducer(installbases = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case RETRIEVE_INSTALL_BASE:
      return payload

    default:
      return installbases
  }
}

export default InstallBaseReducer