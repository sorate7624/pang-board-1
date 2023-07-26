// store/reducers.js
import { SET_RESPONSE_DATA } from "./actions"

const initialState = {
  responseData: null,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_RESPONSE_DATA:
      return {
        ...state,
        responseData: action.payload,
      }
    default:
      return state
  }
}

export default reducer
