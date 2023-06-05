import { RETRIEVE_PRODUCTS_PRICE } from "../types"

import ProductPriceService from "../../../services/ProductPriceService"


export const retrieveProductPrice = (site, date, bp, product) => async (dispatch) => {
  try {
    const res = await ProductPriceService.getAllPrice(site, date, bp, product)

    dispatch({
      type: RETRIEVE_PRODUCTS_PRICE,
      payload: res
    })
  } catch (err) {
    console.log(err)
  }
}