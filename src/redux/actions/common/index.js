import {
  RETRIEVE_ADDRESSES,
  RETRIEVE_CARRIERS,
  RETRIEVE_DELIVERY_MODES
} from "../types"

import CommonDataService from "../../../services/CommonService"

export const retrieveAddresses = (id, type) => async (dispatch) => {
  try {
    const res = await CommonDataService.getAllAddresses(id, type)

    dispatch({
      type: RETRIEVE_ADDRESSES,
      payload: res.data
    })
  } catch (err) {
    console.log(err)
  }
}

export const retrieveCarriers = () => async (dispatch) => {
  try {
    const res = await CommonDataService.getAllCarriers()

    dispatch({
      type: RETRIEVE_CARRIERS,
      payload: res.data
    })
  } catch (err) {
    console.log(err)
  }
}

export const retrieveDeliveryModes = () => async (dispatch) => {
  try {
    const res = await CommonDataService.getAllDeliveryModes()

    dispatch({
      type: RETRIEVE_DELIVERY_MODES,
      payload: res.data
    })
  } catch (err) {
    console.log(err)
  }
}