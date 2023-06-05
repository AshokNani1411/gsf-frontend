import { RETRIEVE_SERVICE_REQUESTS } from "../types"

import ServiceRequestDataService from "../../../services/ServiceRequestService"

export const retrieveServiceRequests = (site, x3user) => async (dispatch) => {
  try {
    const res = await ServiceRequestDataService.getAll({site, x3user})
  
    dispatch({
      type: RETRIEVE_SERVICE_REQUESTS,
      payload: res.data
    })
  } catch (err) {
    console.log(err)
  }
}

export const deleteServiceRequest = (id) => async (dispatch) => {
  try {
    await ServiceRequestDataService.remove({id})
    dispatch({
      type: DELETE_SERVICE_REQUEST,
      payload: {id}
    })
  } catch (err) {
    console.log(err)
  }
}
