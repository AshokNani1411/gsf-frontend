import { RETRIEVE_DASHBOARD_DATA, RETRIEVE_SUPPLIER_DASHBOARD_DATA } from "../../actions/types"

const initialState = []

function dashboardReducer(dashboardData = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case RETRIEVE_DASHBOARD_DATA:
      return payload
    
      case RETRIEVE_SUPPLIER_DASHBOARD_DATA:
      return payload

    default:
      return dashboardData
  }
}

export default dashboardReducer