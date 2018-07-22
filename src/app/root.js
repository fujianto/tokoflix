import React, { PureComponent } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import HomePage from 'app/containers/home_page';
import DetailPage from 'app/containers/detail_page';

import configureStore from './store';
const { persistor, store } = configureStore();

class Root extends PureComponent {
  render() {
    return (
      <Provider store={store}>
        {/* <PersistGate loading={null} persistor={persistor}> */}
          <Router>
            <React.Fragment>
              <Route exact path='/' render={() => <HomePage />} />
              <Route exact path='/:movie_info' render={() => (<DetailPage />)} />
            </React.Fragment>
          </Router>
        {/* </PersistGate> */}
      </Provider>
    );
  }
}

export default Root;