import React, { PureComponent } from 'react'
import PropTypes from 'prop-types';
import styles from './movie_widget.scss';
import { Link } from 'react-router-dom';
import Helpers from 'app/helpers';
import { MOVIE_POSTER_PATH, MOVIE_API_URL, MOVIE_API_KEY } from 'app/config';

export default class MovieWidget extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      movies: [
        {
          id: 1,
          title: '',
          poster: ''
        }
      ]
    }
  }

  componentDidMount() {
    this.fetchMovieCollections()
  }

  async fetchMovieCollections() {
    const url = `${MOVIE_API_URL}${this.props.movie_id}/${this.props.movie_type}?api_key=${MOVIE_API_KEY}&language=en-US&page=1`;
    const response = await fetch(url);
    const item = await response.json();
    this.setState({
      movies: Helpers.chunkArray(item.results, this.props.per_page)[0]
    });
  }

  render() {
    return (
      <div className="movie-widget">
        <h3 className="widget-title">{this.props.widget_title }</h3>
        {
          typeof this.state.movies !== 'undefined' ?
            this.state.movies.map((movie, index) => {
              return (
                <div className="media" key={index}>
                  <a href={`/${movie.id}-${Helpers.sluggifyTitle(movie.title)}`}>
                    <img style={{ maxWidth: '100px' } } className="align-self-start mr-3" src={`${MOVIE_POSTER_PATH}${movie.poster_path}`} alt="Poster" />
                  </a>

                  <div className="media-body">
                    <h5 className="mt-0 title">{ movie.title }</h5>
                    <p>Rating: {movie.vote_average}</p>
                    <p>Relesae Date: {movie.release_date}</p>
                  </div>
                </div> 
              )
            })
            : null
        }
      
      <hr/>
      </div>
    )
  }
}
