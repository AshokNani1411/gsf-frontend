import { RETRIEVE_BUSINESS_PARTNERS } from "../types"

import BusinessPartnerDataService from "../../../services/BusinessPartnerService"

export const retrieveBusinessPartners = () => async (dispatch) => {
  try {
    const res = await BusinessPartnerDataService.getAll()

    dispatch({
      type: RETRIEVE_BUSINESS_PARTNERS,
      payload: res.data
    })
  } catch (err) {
    console.log(err)
  }
}