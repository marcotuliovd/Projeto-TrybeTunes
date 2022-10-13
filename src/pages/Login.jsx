import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Carregando from '../components/carregando';
import '../style/login.css';
// eslint-disable-next-line import/order
import { BsFillDoorOpenFill } from 'react-icons/bs';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      buttonDisabled: true,
      loadingPage: false,
    };
  }

  saveName = (nameInput) => {
    this.setState({ name: nameInput.target.value });
    this.disabledButton(nameInput.target.value);
  }

  disabledButton = (name) => {
    const tres = 3;
    if (name.length >= tres) {
      this.setState({ buttonDisabled: false });
    } else {
      this.setState({ buttonDisabled: true });
    }
  }

  handleClick = async (name, event) => {
    event.preventDefault();
    this.setState({ loadingPage: true }, async () => {
      await createUser({ name });
      const { history } = this.props;
      history.push('/search');
    });
  }

  render() {
    const { name, buttonDisabled, loadingPage } = this.state;
    return (
      <div className="login">
        { loadingPage ? <Carregando />
          : (
            <div data-testid="page-login">
              <form className="forms">
                <label htmlFor="nameInput">
                  <input
                    data-testid="login-name-input"
                    placeholder="Name"
                    type="text"
                    value={ name }
                    onChange={ (nameInput) => this.saveName(nameInput) }
                    name="nome"
                  />
                </label>
                <button
                  data-testid="login-submit-button"
                  type="button"
                  disabled={ buttonDisabled }
                  onClick={ (event) => this.handleClick(name, event) }
                >
                  <BsFillDoorOpenFill />
                </button>

              </form>
            </div>
          )}
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
