import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { emailAction } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    isSaveButtonDisabled: true,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.saveButtonDisabled());
  };

  saveButtonDisabled = () => {
    const userEmailRegex = /\S+@\S+\.\S+/;
    const minPassword = 6;

    const { email, password } = this.state;
    console.log(password);
    const isEmailValid = userEmailRegex.test(email);
    if (isEmailValid && password.length >= minPassword) {
      this.setState({
        isSaveButtonDisabled: false,
      });
    } else {
      this.setState({
        isSaveButtonDisabled: true,
      });
    }
  };

  onSaveButtonClick = () => {
    const { email } = this.state;
    const { history, dispatch } = this.props;
    dispatch(emailAction(email));
    history.push('/carteira');
  };

  render() {
    const { email, password, isSaveButtonDisabled } = this.state;
    return (
      <form>
        <input
          data-testid="email-input"
          placeholder="Email"
          type="email"
          name="email"
          value={ email }
          onChange={ this.handleChange }
        />
        <input
          data-testid="password-input"
          placeholder="Senha"
          type="password"
          name="password"
          value={ password }
          onChange={ this.handleChange }
        />
        <button
          type="button"
          name="button"
          disabled={ isSaveButtonDisabled }
          onClick={ this.onSaveButtonClick }
        >
          Entrar
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
