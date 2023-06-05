import { RETRIEVE_PRODUCTS } from "../types"

import ProductDataService from "../../../services/ProductService"

export const retrieveProducts = (site) => async (dispatch) => {
  try {
    const res = await ProductDataService.getAll(site)

    dispatch({
      type: RETRIEVE_PRODUCTS,
      payload: res.data
    })
  } catch (err) {
    console.log(err)
  }
}
