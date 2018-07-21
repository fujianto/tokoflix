import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getLatestMovies } from 'app/actions/movies';
import Header from 'app/components/header'

export class home_page extends Component {
  render() {
    return (
      <div>
        <Header/>
        
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