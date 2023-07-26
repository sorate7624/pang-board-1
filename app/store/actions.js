// store/actions.js
export const SET_RESPONSE_DATA = "SET_RESPONSE_DATA"

export const setResponseData = (data) => ({
  type: SET_RESPONSE_DATA,
  payload: data,
})
