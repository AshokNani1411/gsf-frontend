import { RETRIEVE_CUSTOMERS, RETRIEVE_CUSTOMER_CONCODE } from "../types"

import CustomerDataService from "../../../services/CustomerService"

export const retrieveCustomers = () => async (dispatch) => {
  try {
    const res = await CustomerDataService.getAll()

    dispatch({
      type: RETRIEVE_CUSTOMERS,
      payload: res.data
    })
  } catch (err) {
    console.log(err)
  }
}

export const retrieveCustomerConCode = (id) => async (dispatch) => {
  try {
    const res = await CustomerDataService.getConCode(id)

    dispatch({
      type: RETRIEVE_CUSTOMER_CONCODE,
      payload: res.data
    })
  } catch (err) {
    console.log(err)
  }
}