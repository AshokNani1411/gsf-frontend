import { RETRIEVE_DELIVERIES } from "../types"

import DeliveryDataService from "../../../services/DeliveryService"

export const retrieveDeliveries = (site, x3user) => async (dispatch) => {
  try {
    const res = await DeliveryDataService.getAll({site, x3user})
  
    dispatch({
      type: RETRIEVE_DELIVERIES,
      payload: res.data
    })
  } catch (err) {
    console.log(err)
  }
}