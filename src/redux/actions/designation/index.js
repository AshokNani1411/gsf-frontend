import { RETRIEVE_DESIGNATIONS } from "../types"

import DesignationDataService from "../../../services/DesignationService"

export const retrieveDesignations = () => async (dispatch) => {
  try {
    const res = await DesignationDataService.getAll()

    dispatch({
      type: RETRIEVE_DESIGNATIONS,
      payload: res.data
    })
  } catch (err) {
    console.log(err)
  }
}