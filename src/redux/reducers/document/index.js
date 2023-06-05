import { RETRIEVE_DOCUMENTS, CREATE_DOCUMENT, UPDATE_DOCUMENT, DELETE_DOCUMENT } from "../../actions/types"

const initialState = []

function contactReducer(documents = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case CREATE_DOCUMENT:
      return [...documents, payload]

    case RETRIEVE_DOCUMENTS:
      return payload

    case UPDATE_DOCUMENT:
      return documents.map((contact) => {
        if (contact.ROWID === payload.id) {
          return {
            ...contact,
            ...payload
          }
        } else {
          return contact
        }
      })
  
    case DELETE_DOCUMENT:
      return documents.filter(({ ROWID }) => ROWID !== payload.id)

    default:
      return documents
  }
}

export default contactReducer