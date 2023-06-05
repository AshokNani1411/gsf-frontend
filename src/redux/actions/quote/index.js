import { RETRIEVE_QUOTES } from "../types"

import QuoteDataService from "../../../services/QuoteService"

export const retrieveQuotes = (site, x3user) => async (dispatch) => {
  try {
    const res = await QuoteDataService.getAll({site, x3user})
  
    dispatch({
      type: RETRIEVE_QUOTES,
      payload: res.data
    })
  } catch (err) {
    console.log(err)
  }
}