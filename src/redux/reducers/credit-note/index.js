import { RETRIEVE_CREDITNOTES } from "../../actions/types"

const initialState = []

function creditNoteReducer(creditNotes = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case RETRIEVE_CREDITNOTES:
      return payload

    default:
      return creditNotes
  }
}


export default creditNoteReducer