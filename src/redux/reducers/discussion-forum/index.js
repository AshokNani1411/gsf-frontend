import { RETRIEVE_DISCUSSION_FORUMS, CREATE_DISCUSSION_FORUM, UPDATE_DISCUSSION_FORUM, DELETE_DISCUSSION_FORUM } from "../../actions/types"

const initialState = []

function discussionForumReducer(discussionForums = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case CREATE_DISCUSSION_FORUM:
      return [...discussionForums, payload]

    case RETRIEVE_DISCUSSION_FORUMS:
      return payload

    case UPDATE_DISCUSSION_FORUM:
      return discussionForums.map((discussionForum) => {
        if (discussionForum.ROWID === payload.id) {
          return {
            ...discussionForum,
            ...payload
          }
        } else {
          return discussionForum
        }
      })
  
    case DELETE_DISCUSSION_FORUM:
      return discussionForums.filter(({ ROWID }) => ROWID !== payload.id)

    default:
      return discussionForums
  }
}

export default discussionForumReducer