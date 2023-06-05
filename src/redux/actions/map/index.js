import { RETRIEVE_MAP_DATA } from "../types"

import MapDataService from "../../../services/MapService"

export const retrieveMapData = (site, doc_type, from_date, to_date) => async (dispatch) => {
  try {
    const res = await MapDataService.getAll({site, doc_type, from_date, to_date})

    dispatch({
      type: RETRIEVE_MAP_DATA,
      payload: res.data
    })
  } catch (err) {
    console.log(err)
  }
}