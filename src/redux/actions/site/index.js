import { RETRIEVE_SITES, RETRIEVE_SITES_BY_ID } from "../types"

import SiteDataService from "../../../services/SiteService"

export const retrieveSites = () => async (dispatch) => {
  try {
    const res = await SiteDataService.getAll()

    dispatch({
      type: RETRIEVE_SITES,
      payload: res.data
    })
  } catch (err) {
    console.log(err)
  }
}

export const retrieveSitesById = (ID) => async (dispatch) => {
  try {
    const res = await SiteDataService.getById(ID)

    dispatch({
      type: RETRIEVE_SITES_BY_ID,
      payload: res.data
    })
  } catch (err) {
    console.log(err)
  }
}