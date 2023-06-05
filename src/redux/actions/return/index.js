import { RETRIEVE_RETURNS } from "../types"

import ReturnDataService from "../../../services/ReturnService"

export const retrieveReturns = (site, x3user) => async (dispatch) => {
  try {
    const res = await ReturnDataService.getAll({site, x3user})
  
    dispatch({
      type: RETRIEVE_RETURNS,
      payload: res.data
    })
  } catch (err) {
    console.log(err)
  }
}
