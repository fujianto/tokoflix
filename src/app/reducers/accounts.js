const initialState = {
  accounts: []
}

export const Accounts = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ACCOUNTS':
      const latestAccounts = state.accounts.concat(action.payload.accounts)
      return { ...state, accounts: latestAccounts }

    default:
      return state
  }
}