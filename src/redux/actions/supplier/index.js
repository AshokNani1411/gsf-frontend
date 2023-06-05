import { RETRIEVE_SUPPLIERS, RETRIEVE_SUPPLIER_CONCODE } from "../types"

import SupplierDataService from "../../../services/SupplierService"

export const retrieveSuppliers = () => async (dispatch) => {
  try {
    const res = await SupplierDataService.getAll()

    dispatch({
      type: RETRIEVE_SUPPLIERS,
      payload: res.data
    })
  } catch (err) {
    console.log(err)
  }
}

export const retrieveSupplierConCode = (id) => async (dispatch) => {
  try {
    const res = await SupplierDataService.getConCode(id)

    dispatch({
      type: RETRIEVE_SUPPLIER_CONCODE,
      payload: res.data
    })
  } catch (err) {
    console.log(err)
  }
}