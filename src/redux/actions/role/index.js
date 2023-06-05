import { RETRIEVE_ROLES } from "../types"

import RoleDataService from "../../../services/RoleService"

export const retrieveRoles = () => async (dispatch) => {
  try {
    const res = await RoleDataService.getAll()

    dispatch({
      type: RETRIEVE_ROLES,
      payload: res.data
    })
  } catch (err) {
    console.log(err)
  }
}