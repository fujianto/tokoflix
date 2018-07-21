import { ACCOUNT } from 'app/config'
import { GET_ACCOUNT, SET_PAID_MOVIE } from 'app/actions/accounts'

const initialState = {
  account: ACCOUNT,
  paid_movies: [
    {
      "id": 238636,
      "video": false,
      "vote_average": 6.6,
      "title": "The Purge: Anarchy",
      "popularity": 85.364,
      "poster_path": "/l1DRl40x2OWUoPP42v8fjKdS1Z3.jpg"
    }
  ]
}

export const Accounts = (state = initialState, action) => {
  switch (action.type) {
    case GET_ACCOUNT:
      return state;

    case SET_PAID_MOVIE:
      const newPaidMovie = state.paid_movies.concat(action.payload.paid_movie);
      return { ...state, paid_movies: newPaidMovie };

    default:
      return state;
  }
}