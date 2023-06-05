import { RETRIEVE_DASHBOARD_DATA, RETRIEVE_SUPPLIER_DASHBOARD_DATA } from "../types"

import DashboardService from "../../../services/DashboardService"

export const retrieveDashboardData = (site, x3user) => async (dispatch) => {
  try {
    const res = await DashboardService.getDashboardData({site, x3user})
  
    dispatch({
      type: RETRIEVE_DASHBOARD_DATA,
      payload: res.data
    })
  } catch (err) {
    console.log(err)
  }
}

export const retrieveSupplierDashboardData = (site, x3user) => async (dispatch) => {
  try {
    const res = await DashboardService.getSupplierDashboardData({site, x3user})
  
    dispatch({
      type: RETRIEVE_SUPPLIER_DASHBOARD_DATA,
      payload: res.data
    })
  } catch (err) {
    console.log(err)
  }
}