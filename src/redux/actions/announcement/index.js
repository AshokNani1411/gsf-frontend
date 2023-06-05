import {
  RETRIEVE_ANNOUNCEMENTS,
  CREATE_ANNOUNCEMENT,
  DELETE_ANNOUNCEMENT
} from "../types"

import AnnouncementDataService from "../../../services/AnnouncementService"

export const retrieveAnnouncements = () => async (dispatch) => {
  try {
    const res = await AnnouncementDataService.getAll()
    dispatch({
      type: RETRIEVE_ANNOUNCEMENTS,
      payload: res.data
    })
  } catch (err) {
    console.log(err)
  }
}

export const createAnnouncement = (announcement) => async (dispatch) => {
  try {
    const res = await AnnouncementDataService.create(announcement)

    dispatch({
      type: CREATE_ANNOUNCEMENT,
      payload: res
    })
    return Promise.resolve(res)
  } catch (err) {
    return Promise.reject(err)
  }
}

export const deleteAnnouncement = (id) => async (dispatch) => {
  try {
    await AnnouncementDataService.remove({id})
    dispatch({
      type: DELETE_ANNOUNCEMENT,
      payload: {id}
    })
  } catch (err) {
    console.log(err)
  }
}