import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { email, expenses } = this.props;
    return (
      <header>
        <div data-testid="email-field">
          Email:
          { email }
        </div>
        <div data-testid="total-field">{ expenses.toFixed(2) }</div>
        <div data-testid="header-currency-field">BRL</div>
      </header>
    );
  }
}

const mapStateToProps = (globalState) => ({
  email: globalState.user.email,
  wallet: globalState.wallet,
  expenses: globalState.wallet.expenses.reduce((acc, curr) => acc
  + (+curr.value * curr.exchangeRates[curr.currency].ask), 0),
});

Header.propTypes = {
  email: PropTypes.string,
  expenses: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps)(Header);
