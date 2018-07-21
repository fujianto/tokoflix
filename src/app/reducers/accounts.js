import { ACCOUNT } from 'app/config'
import { GET_ACCOUNT } from 'app/actions/accounts'

const initialState = {
  account: ACCOUNT
}

export const Accounts = (state = initialState, action) => {
  switch (action.type) {
    case GET_ACCOUNT:
      return state

    default:
      return state
  }
}