import { RETRIEVE_CONTACT, CREATE_CONTACT, UPDATE_CONTACT, DELETE_CONTACT } from "../../actions/types"

const initialState = []

function contactReducer(contacts = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case CREATE_CONTACT:
      return [...contacts, payload]

    case RETRIEVE_CONTACT:
      return payload

    case UPDATE_CONTACT:
      return contacts.map((contact) => {
        if (contact.ROWID === payload.id) {
          return {
            ...contact,
            ...payload
          }
        } else {
          return contact
        }
      })
  
    case DELETE_CONTACT:
      return contacts.filter(({ ROWID }) => ROWID !== payload.id)

    default:
      return contacts
  }
}

export default contactReducer