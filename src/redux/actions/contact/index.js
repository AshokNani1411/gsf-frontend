import { RETRIEVE_CONTACT, CREATE_CONTACT, UPDATE_CONTACT, DELETE_CONTACT } from "../types"

import ContactDataService from "../../../services/ContactService"

export const createContact = (contact) => async (dispatch) => {
  try {
    const res = await ContactDataService.create(contact)

    dispatch({
      type: CREATE_CONTACT,
      payload: res
    })
    return Promise.resolve(res)
  } catch (err) {
    return Promise.reject(err)
  }
}

export const retrieveContacts = () => async (dispatch) => {
  try {
    const res = await ContactDataService.getAll()

    dispatch({
      type: RETRIEVE_CONTACT,
      payload: res.data
    })
  } catch (err) {
    console.log(err)
  }
}

export const updateContact = (contact) => async (dispatch) => {
  try {
    const res = await ContactDataService.update(contact)
    dispatch({
      type: UPDATE_CONTACT,
      payload: res
    })
    return Promise.resolve(res)
  } catch (err) {
    return Promise.reject(err)
  }
}

export const deleteContact = (id) => async (dispatch) => {
  try {
    await ContactDataService.remove({id})
    dispatch({
      type: DELETE_CONTACT,
      payload: {id}
    })
  } catch (err) {
    console.log(err)
  }
}