import { RETRIEVE_ANNOUNCEMENTS, CREATE_ANNOUNCEMENT, UPDATE_ANNOUNCEMENT, DELETE_ANNOUNCEMENT } from "../../actions/types"

const initialState = []

function announcementReducer(announcements = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case CREATE_ANNOUNCEMENT:
      return [...announcements, payload]

    case RETRIEVE_ANNOUNCEMENTS:
      return payload

    case UPDATE_ANNOUNCEMENT:
      return announcements.map((announcement) => {
        if (announcement.ROWID === payload.id) {
          return {
            ...announcement,
            ...payload
          }
        } else {
          return announcement
        }
      })
  
    case DELETE_ANNOUNCEMENT:
      return announcements.filter(({ ROWID }) => ROWID !== payload.id)

    default:
      return announcements
  }
}

export default announcementReducer