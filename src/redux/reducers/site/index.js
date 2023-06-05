import { RETRIEVE_SITES, RETRIEVE_SITES_BY_ID } from "../../actions/types"

const initialState = []

function siteReducer(sites = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case RETRIEVE_SITES:
      return payload
    
    case RETRIEVE_SITES_BY_ID:
      return payload

    default:
      return sites
  }
}

export default siteReducer