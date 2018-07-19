import React, { PureComponent } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from 'app/store/'

import HomePage from 'app/containers/home_page'
import DetailPage from 'app/containers/detail_page'

class Root extends PureComponent {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <React.Fragment>
            <Route exact path='/' render={() => <HomePage />} />
            <Route exact path='/:movie_info' render={() => (<DetailPage />)} />
          </React.Fragment>
        </Router>
      </Provider>
    );
  }
}

export default Root;