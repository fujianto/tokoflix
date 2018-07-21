import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getLatestMovies } from 'app/actions/movies';
import Header from 'app/components/header'
import MovieGrid from 'app/components/movie_grid'

export class home_page extends Component {
  render() {
    return (
      <div className='wrapper'>
        <Header/>
        <MovieGrid/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    movies: state.Movies.movies
  }
}
const mapDispatchToProps = (dispatch)=> {
  return {
    getLatestMovies: (movies) => dispatch(getLatestMovies(movies))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(home_page)