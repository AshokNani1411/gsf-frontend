import { RETRIEVE_PRODUCTCATEG } from "../../actions/types"

const initialState = []

function productCategoriesReducer(productCategories = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case RETRIEVE_PRODUCTCATEG:
      return payload

    default:
      return productCategories
  }
}

export default productCategoriesReducer