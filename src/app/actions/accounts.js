export const GET_ACCOUNT = 'GET_ACCOUNT'

export const getAccount = () => {
  return (dispatch) => {
    dispatch({
      type: GET_ACCOUNT
    })
  }
}