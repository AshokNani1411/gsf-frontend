import { RETRIEVE_PICKUP_REQUESTS, CREATE_PICKUP_REQUEST, DELETE_PICKUP_REQUEST } from "../types"

import PickupRequestDataService from "../../../services/PickupRequestService"

export const retrievePickupRequests = (site, x3user) => async (dispatch) => {
  try {
    const res = await PickupRequestDataService.getAll({site, x3user})
  
    dispatch({
      type: RETRIEVE_PICKUP_REQUESTS,
      payload: res.data
    })
  } catch (err) {
    console.log(err)
  }
}

export const createPickupRequest = (data) => async (dispatch) => {
  try {
    const res = await PickupRequestDataService.create(data)

    dispatch({
      type: CREATE_PICKUP_REQUEST,
      payload: res
    })

    return Promise.resolve(res)
  } catch (err) {
    return Promise.reject(err)
  }
}

export const deletePickupRequest = (id) => async (dispatch) => {
  try {
    await PickupRequestDataService.remove({id})
    dispatch({
      type: DELETE_PICKUP_REQUEST,
      payload: {id}
    })
  } catch (err) {
    console.log(err)
  }
}