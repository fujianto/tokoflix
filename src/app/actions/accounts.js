export const GET_ACCOUNT = 'GET_ACCOUNT';
export const SET_PAID_MOVIE = 'SET_PAID_MOVIE';

export const getAccount = () => {
  return (dispatch) => {
    dispatch({
      type: GET_ACCOUNT
    })
  }
};

export const setPaidMovie = (paid_movie) => {
  return (dispatch) => {
    dispatch({
      type: SET_PAID_MOVIE,
      payload: {
        paid_movie: paid_movie
      }
    })
  }
};
