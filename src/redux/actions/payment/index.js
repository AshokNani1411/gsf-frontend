import { RETRIEVE_PAYMENTS} from "../types"

import PaymentDataService from "../../../services/PaymentService"

export const retrievePayments = (site, x3user) => async (dispatch) => {
  try {
    const res = await PaymentDataService.getAll({site, x3user})
  
    dispatch({
      type: RETRIEVE_PAYMENTS,
      payload: res.data
    })
  } catch (err) {
    console.log(err)
  }
}



