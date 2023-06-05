import { RETRIEVE_DROP_REQUESTS, CREATE_DROP_B2C_REQUEST, CREATE_DROP_REQUEST, DELETE_DROP_REQUEST, RETRIEVE_SOCART_REQUESTS, CREATE_SOCART_REQUEST, DELETE_SOCART_REQUEST } from "../types"

import DropRequestDataService from "../../../services/DropRequestService"

export const retrieveDropRequests = (site, x3user) => async (dispatch) => {
  try {
    const res = await DropRequestDataService.getAll({site, x3user})

    dispatch({
      type: RETRIEVE_DROP_REQUESTS,
      payload: res.data
    })
  } catch (err) {
    console.log(err)
  }
}

export const createDropRequest = (data) => async (dispatch) => {
  try {
    const res = await DropRequestDataService.create(data)

    dispatch({
      type: CREATE_DROP_REQUEST,
      payload: res
    })

    return Promise.resolve(res)
  } catch (err) {
    return Promise.reject(err)
  }
}

export const createB2CDropRequest = (data) => async (dispatch) => {
  try {
    const res = await DropRequestDataService.create(data)

    dispatch({
      type: CREATE_DROP_B2C_REQUEST,
      payload: res
    })

    return Promise.resolve(res)
  } catch (err) {
    return Promise.reject(err)
  }
}

export const deleteDropRequest = (id) => async (dispatch) => {
  try {
    await DropRequestDataService.remove({id})
    dispatch({
      type: DELETE_DROP_REQUEST,
      payload: {id}
    })
  } catch (err) {
    console.log(err)
  }
}

//CART
export const retrievesSOCartRequests = (site, x3user) => async (dispatch) => {
  try {
    const res = await DropRequestDataService.getSOCartAll({site, x3user})

    dispatch({
      type: RETRIEVE_SOCART_REQUESTS,
      payload: res.data
    })
  } catch (err) {
    console.log(err)
  }
}


export const createSOCartRequest = (data) => async (dispatch) => {
  try {
    const res = await DropRequestDataService.createSOCart(data)

    dispatch({
      type: CREATE_SOCART_REQUEST,
      payload: res
    })

    return Promise.resolve(res)
  } catch (err) {
    return Promise.reject(err)
  }
}

export const deleteSOCartRequest = (data) => async (dispatch) => {
  try {
   const res =  await DropRequestDataService.removeSOCart(data)
    dispatch({
      type: DELETE_SOCART_REQUEST,
      payload: res
    })
  } catch (err) {
    console.log(err)
  }
}