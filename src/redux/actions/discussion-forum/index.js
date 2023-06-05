import {
  RETRIEVE_DISCUSSION_FORUMS,
  CREATE_DISCUSSION_FORUM,
  UPDATE_DISCUSSION_FORUM,
  DELETE_DISCUSSION_FORUM
} from "../types"

import discussionForumDataService from "../../../services/DiscussionForumService"

export const retrieveDiscussionForums = () => async (dispatch) => {
  try {
    const res = await discussionForumDataService.getAll()
    dispatch({
      type: RETRIEVE_DISCUSSION_FORUMS,
      payload: res.data
    })
  } catch (err) {
    console.log(err)
  }
}

export const createDiscussionForum = (announcement) => async (dispatch) => {
  try {
    const res = await discussionForumDataService.create(announcement)

    dispatch({
      type: CREATE_DISCUSSION_FORUM,
      payload: res
    })
    return Promise.resolve(res)
  } catch (err) {
    return Promise.reject(err)
  }
}

export const updateDiscussionForum = (announcement) => async (dispatch) => {
  try {
    const res = await discussionForumDataService.create(announcement)

    dispatch({
      type: UPDATE_DISCUSSION_FORUM,
      payload: res
    })
    return Promise.resolve(res)
  } catch (err) {
    return Promise.reject(err)
  }
}

export const deleteDiscussionForum = (id) => async (dispatch) => {
  try {
    await discussionForumDataService.remove({id})
    dispatch({
      type: DELETE_DISCUSSION_FORUM,
      payload: {id}
    })
  } catch (err) {
    console.log(err)
  }
}