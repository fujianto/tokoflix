export const GET_LATEST_MOVIES = 'GET_LATEST_MOVIES' 

export const getLatestMovies = (movies) => {
  return (dispatch) => {
    dispatch({
      type: GET_LATEST_MOVIES,
      payload: {
        movies: movies,
      }
    })
  }
}