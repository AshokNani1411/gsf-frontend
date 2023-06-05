import { RETRIEVE_ORDERS, RETRIEVE_PURCHASE_ORDERS } from "../types"

import OrderDataService from "../../../services/OrderService"

export const retrieveOrders = (site, x3user) => async (dispatch) => {
  try {
    const res = await OrderDataService.getAll({site, x3user})
  
    dispatch({
      type: RETRIEVE_ORDERS,
      payload: res.data
    })
  } catch (err) {
    console.log(err)
  }
}

export const retrievePurchaseOrders = (site, x3user) => async (dispatch) => {
  try {
    const res = await OrderDataService.getAllPurchaseOrders({site, x3user})
  
    dispatch({
      type: RETRIEVE_PURCHASE_ORDERS,
      payload: res.data
    })
  } catch (err) {
    console.log(err)
  }
}