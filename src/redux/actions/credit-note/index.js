import { RETRIEVE_CREDITNOTES } from "../types"

import CreditNoteDataService from "../../../services/CreditNoteService"

export const retriveCreditNotes = (site, x3user) => async (dispatch) => {
  try {
    const res = await CreditNoteDataService.getAll({site, x3user})

    dispatch({
      type: RETRIEVE_CREDITNOTES,
      payload: res.data
    })
  } catch (err) {
    console.log(err)
  }
}