import { RETRIEVE_RECEIPTS } from "../types"

import ReceiptDataService from "../../../services/ReceiptService"

export const retriveReceipts = (site, x3user) => async (dispatch) => {
  try {
    const res = await ReceiptDataService.getAll({site, x3user})

    dispatch({
      type: RETRIEVE_RECEIPTS,
      payload: res.data
    })
  } catch (err) {
    console.log(err)
  }
}