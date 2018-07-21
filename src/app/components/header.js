import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { getAccount } from 'app/actions/accounts'
import { Link } from 'react-router-dom';
import style from './header.scss';

class Header extends PureComponent {
  render() {
    return (
      <header className="header">
        <Link to="/"><h1 className="site-title">TokoFlix</h1></Link>
        <input type="text" className='form-control search-top' />
        <h3 className='balance'> {this.props.account.balance}</h3>
      </header>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    account: state.Accounts.account
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAccount: () => dispatch(getAccount())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)