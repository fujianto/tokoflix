export const GET_ACCOUNTS = 'GET_ACCOUNTS'

export const getAccounts = (accounts) => {
  return (dispatch) => {
    dispatch({
      type: GET_ACCOUNTS,
      payload: {
        accounts: accounts,
      }
    })
  }
}