import React, { Component } from 'react';
import Header from 'app/components/header';
import { withRouter } from 'react-router';
import Helpers from 'app/helpers';
import { connect } from 'react-redux';
import { getLatestMovies } from 'app/actions/movies';
import { getAccount, buyMovie } from 'app/actions/accounts';
import { MOVIE_API_URL, MOVIE_API_KEY, MOVIE_POSTER_PATH } from 'app/config';
import { Link } from 'react-router-dom';
import style from './detail_page.scss';
import root from 'app/root.scss';

class DetailPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movie : {},
      casts: []
    }
  }

  componentDidMount() {
    const currentMovieId = +Helpers.getMovieIdFromPath(this.props.match.params.movie_info);
    this.fetchMovie(currentMovieId);
    this.fetchCasts(currentMovieId);
  }

  async fetchMovie(movie_id) {
    const url = `${MOVIE_API_URL}${ movie_id }?api_key=${MOVIE_API_KEY}&language=en-US`;
    const response = await fetch(url);
    const item = await response.json();

    this.setState({
      movie: item
    });
  }

  async fetchCasts(movie_id) {
    const url = `${MOVIE_API_URL}${movie_id}/credits?api_key=${MOVIE_API_KEY}&language=en-US`;
    const response = await fetch(url);
    const item = await response.json();

    this.setState({
      casts: item.cast
    });
  }

  OnBuyMovie(movie) {
    const currentBalance = this.props.account.balance;
    const moviePrice = Helpers.getPrice(movie.vote_average);

    if (currentBalance - moviePrice > 0) {
      movie.price = moviePrice;
      this.props.purchaseMovie(movie);
    } else {
      alert('Not Enough Balance');
    }
  }

  convertToRupiah(num) {
    var rupiah = '';
    var numrev = num.toString().split('').reverse().join('');
    for (var i = 0; i < numrev.length; i++)
      if (i % 3 === 0) rupiah += numrev.substr(i, 3) + '.';

    return 'Rp. ' + rupiah.split('', rupiah.length - 1).reverse().join('');
  }

  getPrice(rating) {
    if (+rating <= 3) {
      return 3500
    }

    if (+rating > 3 && +rating <= 6) {
      return 8250;
    }

    if (+rating > 6 && +rating <= 8) {
      return 16350
    }

    if (+rating > 8 && +rating <= 10) {
      return 21250
    }
  }
  
  render() {
    return (
      <div className='wrapper'>
        <Header />

        { 
          typeof this.state.movie !== undefined ? 
            <div className="container">
              <div className="row align-items-baseline">
                <div className="col-md-8 content">
                  <h2 className="movie-title">{this.state.movie.title}</h2>

                  <div className="row">
                    <div className="col-md-4">
                      <img src={`${MOVIE_POSTER_PATH}${this.state.movie.poster_path}`} alt="poster" className="poster" />

                      <br />

                      {
                        Helpers.findOwnedMovie(this.state.movie, this.props.paid_movies) ?
                          <button className="btn btn-danger btn-lg u-full-width" id="paid-movie">Paid</button> :
                          <button onClick={() => this.OnBuyMovie(this.state.movie)} className="btn btn-success btn-lg u-full-width" id="buy-movie">Buy</button>
                      }

                    </div>

                    <div className="col-md-8">
                      <dl>
                        <dt>Run Time</dt>
                        <dd>{this.state.movie.runtime} minutes</dd>
                        <dt>Release Date</dt>
                        <dd>{this.state.movie.release_date}</dd>
                        <dt>Ratings</dt>
                        <dd>{this.state.movie.vote_average}</dd>
                        <dt>Overview</dt>
                        <dd>{this.state.movie.overview}</dd>
                        <dt>Price</dt>
                        <dd>{Helpers.convertToRupiah(+Helpers.getPrice(this.state.movie.vote_average))}</dd>

                        <dt>Genre</dt>
                        <dd>
                          <ul>
                            {
                              typeof this.state.movie.genres !== 'undefined' ?
                                this.state.movie.genres.map((genre, index) => {
                                  return (
                                    <li key={index}>{genre.name}</li>
                                  )
                                }) : null
                            }
                          </ul>
                        </dd>

                        <dt>Casts</dt>
                        <dd>
                          {
                            typeof this.state.casts  !== undefined ? 
                              this.state.casts.map((cast, index) => {
                                return (
                                  <li key={index}>{cast.name}</li>
                                )
                              }) : null
                          }
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="widget">
                    <h3 className="widget-title">Related Movies</h3>
                  </div>
                </div>
              </div>
            </div> : null
        }
        
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    movies: state.Movies.movies,
    paid_movies: state.Accounts.paid_movies,
    account: state.Accounts.account
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getMovies: (movies) => dispatch(getLatestMovies(movies)),
    purchaseMovie: (movie) => dispatch(buyMovie(movie)),
    getAccount: () => dispatch(getAccount())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DetailPage))