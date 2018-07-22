export const GET_ACCOUNT = 'GET_ACCOUNT';
export const BUY_MOVIE = 'BUY_MOVIE';

export const getAccount = () => {
  return (dispatch) => {
    dispatch({
      type: GET_ACCOUNT
    })
  }
};

export const buyMovie = (paid_movie) => {
  return (dispatch) => {
    dispatch({
      type: BUY_MOVIE,
      payload: {
        paid_movie: paid_movie
      }
    })
  }
};


