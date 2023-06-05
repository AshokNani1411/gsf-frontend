import { RETRIEVE_PURCHASE_INVOICES } from "../types"

import PurchaseInvoiceDataService from "../../../services/PurchaseInvoiceService"

export const retrivePurchaseInvoices = (site, x3user) => async (dispatch) => {
  try {
    const res = await PurchaseInvoiceDataService.getAll({site, x3user})

    dispatch({
      type: RETRIEVE_PURCHASE_INVOICES,
      payload: res.data
    })
  } catch (err) {
    console.log(err)
  }
}