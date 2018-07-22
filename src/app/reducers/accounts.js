import { ACCOUNT } from 'app/config'
import { GET_ACCOUNT, BUY_MOVIE } from 'app/actions/accounts'

const initialState = {
  account: ACCOUNT,
  paid_movies: [
   
  ]
}

export const Accounts = (state = initialState, action) => {
  switch (action.type) {
    case GET_ACCOUNT:
      return state;

    case BUY_MOVIE:
      const newPaidMovie = state.paid_movies.concat(action.payload.paid_movie);
      const newBalance = state.account.balance - action.payload.paid_movie.price;
      const updatedAccount = newBalance > 0 ? state.account.balance = newBalance : state.account.balance = 0;
      return { ...state, paid_movies: newPaidMovie };

    default:
      return state;
  }
}