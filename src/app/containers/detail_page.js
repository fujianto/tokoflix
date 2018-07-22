import React, { PureComponent } from 'react';
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

class DetailPage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      movie : this.getMovie()
    }
  }

  getMovie() {
    const currentMovieId = +Helpers.getMovieIdFromPath(this.props.match.params.movie_info);
    const currentMovie = this.props.movies.find(movie => { return movie.id === currentMovieId; });
    const defaultMovie = {
      id: '',
      title: '',
      poster: ''
    };

    return typeof currentMovie !== 'undefined' ? currentMovie : defaultMovie;
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
  
  render() {
    return (
      <div className='wrapper'>
        <Header />

        <div className="container">
          <div className="row align-items-baseline">
            <div className="col-md-8 content">
              <h2 className="movie-title">{ this.state.movie.title }</h2>

                <div className="row">
                  <div className="col-md-4">
                    <Link to={`/${this.state.movie.id}-${Helpers.sluggifyTitle(this.state.movie.title)}`}>
                      <img src={`${MOVIE_POSTER_PATH}${this.state.movie.poster_path}`} alt="poster" className="poster" />
                    </Link>

                    <br/> 

                    {
                      Helpers.findOwnedMovie(this.state.movie, this.props.paid_movies) ? 
                        <button className="btn btn-danger btn-lg u-full-width" id="paid-movie">Paid</button> :
                        <button onClick={ () => this.OnBuyMovie(this.state.movie) } className="btn btn-success btn-lg u-full-width" id="buy-movie">Buy</button> 
                    }

                  </div>

                  <div className="col-md-8">
                    <dl>
                      <dt>Release Date</dt>
                      <dd>{this.state.movie.release_date }</dd>
                      <dt>Ratings</dt>
                      <dd>{this.state.movie.vote_average }</dd>
                      <dt>Overview</dt>
                      <dd>{this.state.movie.overview}</dd>
                      <dt>Price</dt>
                      {/* <dd>{ Helpers.convertToRupiah(Helpers.getPrice(this.state.movie.vote_average)) }</dd> */}
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
        </div>
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