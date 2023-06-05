import { RETRIEVE_INSTALL_BASE } from "../types"

import InstallBaseDataService from "../../../services/InstallBaseService"

export const retrieveInstallBase = (site) => async (dispatch) => {
  try {
    const res = await InstallBaseDataService.getAllInstallBase(site)

    dispatch({
      type: RETRIEVE_INSTALL_BASE,
      payload: res.data
    })
  } catch (err) {
    console.log(err)
  }
}