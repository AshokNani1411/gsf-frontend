import {
  CREATE_USER,
  RETRIEVE_USERS,
  UPDATE_USER,
  DELETE_USER
} from "../types"

import UserDataService from "../../../services/UserService"

export const createUser = (user) => async (dispatch) => {
  try {
    const res = await UserDataService.create(user)

    dispatch({
      type: CREATE_USER,
      payload: res
    })

    return Promise.resolve(res)
  } catch (err) {
    return Promise.reject(err)
  }
}

export const retrieveUsers = () => async (dispatch) => {
  try {
    const res = await UserDataService.getAll()

    dispatch({
      type: RETRIEVE_USERS,
      payload: res.data.users
    })
  } catch (err) {
    console.log(err)
  }
}

export const updateUser = (id, name, email, password, phone, role, site, x3user) => async (dispatch) => {
  try {
    const res = await UserDataService.update({id, name, email, password, phone, role, site, x3user})

    dispatch({
      type: UPDATE_USER,
      payload: res
    })

    return Promise.resolve(res)
  } catch (err) {
    return Promise.reject(err)
  }
}

export const deleteUser = (id) => async (dispatch) => {
  try {
    await UserDataService.remove({id})
    dispatch({
      type: DELETE_USER,
      payload: {id}
    })
  } catch (err) {
    console.log(err)
  }
}