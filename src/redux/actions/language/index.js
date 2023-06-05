import { RETRIEVE_LANGUAGES } from "../types"

import LanguageDataService from "../../../services/LanguageService"

export const retrieveLanguages = () => async (dispatch) => {
  try {
    const res = await LanguageDataService.getAll()

    dispatch({
      type: RETRIEVE_LANGUAGES,
      payload: res.data
    })
  } catch (err) {
    console.log(err)
  }
}