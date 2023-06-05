import { RETRIEVE_INVOICES_OPEN_PAYMENTS } from "../types"

import PaymentService from "../../../services/PaymentService"

export const retrivePendingInvoices = (site, x3user) => async (dispatch) => {
  try {
    const res = await PaymentService.getInvoicesforPayments({site, x3user})

    dispatch({
      type: RETRIEVE_INVOICES_OPEN_PAYMENTS,
      payload: res.data
    })
  } catch (err) {
    console.log(err)
  }
}