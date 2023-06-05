import {
  RETRIEVE_DOCUMENTS,
  CREATE_DOCUMENT,
  DELETE_DOCUMENT
} from "../types"

import DocumentDataService from "../../../services/DocumentService"

export const retrieveDocuments = (role, user) => async (dispatch) => {
  try {
    const res = await DocumentDataService.getAll({role, user})
    dispatch({
      type: RETRIEVE_DOCUMENTS,
      payload: res.data
    })
  } catch (err) {
    console.log(err)
  }
}

export const createDocument = (announcement) => async (dispatch) => {
  try {
    const res = await DocumentDataService.create(announcement)

    dispatch({
      type: CREATE_DOCUMENT,
      payload: res
    })
    return Promise.resolve(res)
  } catch (err) {
    return Promise.reject(err)
  }
}

export const deleteDocument = (id) => async (dispatch) => {
  try {
    await DocumentDataService.remove({id})
    dispatch({
      type: DELETE_DOCUMENT,
      payload: {id}
    })
  } catch (err) {
    console.log(err)
  }
}