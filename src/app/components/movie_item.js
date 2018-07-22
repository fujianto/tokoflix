import React, { PureComponent } from 'react'
import style from './movie_item.scss';
import { Link } from 'react-router-dom';
import Helpers from 'app/helpers';
import { MOVIE_POSTER_PATH } from 'app/config';

export default class movie_item extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      movie: {
        title: null,
        price: null,
        poster: null,
        paid: false
      }
    }
  }

  render() {
    return (
      <div className='movie-item'>
        { this.state.movie.paid ? <span className="paid">Paid</span> : null  }
        <Link to={`/${this.props.movie.id}-${Helpers.sluggifyTitle(this.props.movie.title) }`}>
          <img src={`${MOVIE_POSTER_PATH}${ this.props.movie.poster_path }`} alt="poster" className="poster"/>
        </Link>
        <h4 className="title">{this.props.movie.title }</h4>
        <h5 className="price">{Helpers.convertToRupiah(Helpers.getPrice(this.props.movie.vote_average)) }</h5>
      </div>
    )
  }
}
