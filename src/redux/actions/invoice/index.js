import { RETRIEVE_INVOICES } from "../types"

import InvoiceDataService from "../../../services/InvoiceService"

export const retriveInvoices = (site, x3user) => async (dispatch) => {
  try {
    const res = await InvoiceDataService.getAll({site, x3user})

    dispatch({
      type: RETRIEVE_INVOICES,
      payload: res.data
    })
  } catch (err) {
    console.log(err)
  }
}