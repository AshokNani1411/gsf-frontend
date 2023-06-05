import { RETRIEVE_MAP_DATA } from "../../actions/types"

const initialState = []

function mapDataReducer(mapData = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case RETRIEVE_MAP_DATA:
      return payload

    default:
      return mapData
  }
}

export default mapDataReducer