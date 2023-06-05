import { RETRIEVE_BUSINESS_PARTNERS } from "../../actions/types"

const initialState = []

function businessPartnerReducer(businessPartners = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case RETRIEVE_BUSINESS_PARTNERS:
      return payload

    default:
      return businessPartners
  }
}

export default businessPartnerReducer