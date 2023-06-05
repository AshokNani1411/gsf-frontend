import { RETRIEVE_QUOTES } from "../../actions/types"

const initialState = []

function quoteReducer(quotes = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case RETRIEVE_QUOTES:
      return payload

    default:
      return quotes
  }
}

export default quoteReducer