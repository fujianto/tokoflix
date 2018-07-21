import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { getLatestMovies } from './actions/movies'

class MovieGrid extends PureComponent {
  render() {
    return (
      <div className='movie-grid'>
        
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    movies: state.Movies.movies,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getMovies: () => dispatch(getLatestMovies())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieGrid)