import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { walletAction, expenseAction } from '../redux/actions';

class WalletForm extends Component {
  state = {
    value: '',
    currency: 'USD',
    currencies: [],
    method: 'Dinheiro',
    tag: 'Alimentação',
    description: '',
  };

  componentDidMount() {
    this.requestWalletAPI();
  }

  requestWalletAPI = async () => {
    // const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    // const data = await response.json();
    // const arrayKey = Object.keys(data);
    // const getCurrencies = arrayKey.filter((key) => key !== 'USDT');
    const { dispatch } = this.props;
    const arrayKey = await this.fetchAPI();
    const getCurrencies = Object.keys(arrayKey);

    dispatch(walletAction(getCurrencies));
    this.setState({
      currencies: getCurrencies,
    // }, this.handleChangeButton);
    });
  };

  fetchAPI = async () => {
    const res = await fetch('https://economia.awesomeapi.com.br/json/all');
    const resJson = await res.json();
    // console.log(resJson);
    delete resJson.USDT;
    return resJson;
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleChangeButton = async () => {
    const { dispatch, expenses } = this.props;
    const { value, description, currency, method, tag } = this.state;
    const exchangeRates = await this.fetchAPI();

    const expensesObj = {
      id: expenses.length,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    };

    dispatch(expenseAction(expensesObj));
    console.log(expensesObj);
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  };

  render() {
    const { value,
      currency,
      currencies,
      method,
      tag,
      description } = this.state;
    return (
      <form>
        <div>
          <label htmlFor="value">
            Valor:
            <input
              type="number"
              name="value"
              id="value"
              value={ value }
              data-testid="value-input"
              onChange={ this.handleChange }

            />
          </label>
          <br />
          <label htmlFor="currency">
            Moeda:
            <select
              name="currency"
              id="currency"
              value={ currency }
              data-testid="currency-input"
              onChange={ this.handleChange }

            >
              { currencies.map((key) => (
                <option key={ key } value={ key }>{ key }</option>
              )) }
            </select>
          </label>

          <label htmlFor="method">
            Método de pagamento:

            <select
              name="method"
              id="method"
              value={ method }
              data-testid="method-input"
              onChange={ this.handleChange }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <br />

          <label htmlFor="tag">
            <select
              name="tag"
              id="tag"
              value={ tag }
              data-testid="tag-input"
              onChange={ this.handleChange }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>

          <label htmlFor="description">
            Descrição:
            <input
              type="text"
              name="description"
              id="description"
              value={ description }
              data-testid="description-input"
              onChange={ this.handleChange }
            />
          </label>

          <button
            type="button"
            onClick={ this.handleChangeButton }
          >
            Adicionar Despesa
          </button>
        </div>
      </form>
    );
  }
}

const mapStateToProps = (globalState) => ({
  currencies: globalState.wallet,
  expenses: globalState.wallet.expenses,
});

WalletForm.propTypes = {
  dispatch: PropTypes.func,
  expenses: PropTypes.arrayOf(PropTypes.string),
}.isRequired;

export default connect(mapStateToProps)(WalletForm);
