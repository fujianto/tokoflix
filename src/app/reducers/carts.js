const initialState = {
  carts: []
}

export const Carts = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_CARTS':
      const latestCarts = state.carts.concat(action.payload.carts)
      return { ...state, carts: latestCarts }

    default:
      return state
  }
}