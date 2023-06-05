import { RETRIEVE_LANGUAGES } from "../../actions/types"

const initialState = []

function languageReducer(languages = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case RETRIEVE_LANGUAGES:
      return payload

    default:
      return languages
  }
}

export default languageReducer