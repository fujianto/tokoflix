export const GET_CARTS = 'GET_CARTS'

export const getCarts = (carts) => {
  return (dispatch) => {
    dispatch({
      type: GET_CARTS,
      payload: {
        carts: carts,
      }
    })
  }
}