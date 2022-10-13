import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Carregando from './carregando';
import '../style/header.css';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      loadingPage: false,
      user: '',
    };
  }

  componentDidMount() {
    this.showUser();
  }

  async showUser() {
    this.setState({ loadingPage: true }, async () => {
      const userGet = await getUser();
      this.setState({ user: userGet.name, loadingPage: false });
    });
  }

  render() {
    const { loadingPage, user } = this.state;
    return (
      <section data-testid="header-component">
        { loadingPage ? <Carregando /> : (
          <h2 className="nav1" data-testid="header-user-name">
            <div className="nav-link2">{user}</div>
            <Link
              className="nav-link2"
              data-testid="link-to-search"
              to="/search"
            >
              Search

            </Link>
            <Link
              className="nav-link2"
              data-testid="link-to-favorites"
              to="/favorites"
            >
              Favorites

            </Link>
            <Link
              className="nav-link2"
              data-testid="link-to-profile"
              to="/profile"
            >
              Profile

            </Link>
          </h2>
        )}
      </section>
    );
  }
}

export default Header;
