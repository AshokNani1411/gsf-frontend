import { RETRIEVE_PRODUCTCATEG } from "../types"

import ProductCategDataService from "../../../services/ProductCategService"

export const retrieveProductCategories = (site) => async (dispatch) => {
  try {
    const res = await ProductCategDataService.getAllProductCategories(site)

    dispatch({
      type: RETRIEVE_PRODUCTCATEG,
      payload: res.data
    })
  } catch (err) {
    console.log(err)
  }
}