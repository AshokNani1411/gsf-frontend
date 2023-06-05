import { RETRIEVE_PRODUCT_CONSUMPTIONS } from "../types"

import ProductConsumptionDataService from "../../../services/ProductConsumptionService"

export const retrieveProductConsumptions = (site) => async (dispatch) => {
  try {
    const res = await ProductConsumptionDataService.getAllProductConsumptions(site)

    dispatch({
      type: RETRIEVE_PRODUCT_CONSUMPTIONS,
      payload: res.data
    })
  } catch (err) {
    console.log(err)
  }
}