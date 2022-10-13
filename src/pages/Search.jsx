import React, { Component } from 'react';
import { BsSearch } from 'react-icons/bs';
import AlbumsCard from '../components/AlbumsCard';
import Carregando from '../components/carregando';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import '../style/search.css';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      artist: '',
      buttonDisabled: true,
      loading: false,
      resultadoApi: [],
      artistResultado: '',
      mostraResultado: false,
    };
  }

  saveArtist = (Artista) => {
    const art = Artista.target.value;
    this.setState({ artist: art });
    this.disabledButton(art);
  }

  disabledButton = (name) => {
    const dois = 2;
    if (name.length >= dois) {
      this.setState({ buttonDisabled: false });
    } else {
      this.setState({ buttonDisabled: true });
    }
  }

  pesquisar = async (artist, event) => {
    event.preventDefault();
    this.setState({ loading: true, artist: '', artistResultado: artist });
    const album = await searchAlbumsAPI(artist);
    this.setState({ loading: false, resultadoApi: album, mostraResultado: true });
  }

  render() {
    const { buttonDisabled, artist, loading, resultadoApi,
      artistResultado, mostraResultado } = this.state;
    return (
      <>
        <div data-testid="page-search" />
        <Header />
        {loading ? <Carregando /> : (
          <div className="busca">
            <input
              type="text"
              data-testid="search-artist-input"
              onChange={ (artista) => this.saveArtist(artista) }
              placeholder="Name do Artista"
            />
            <button
              data-testid="search-artist-button"
              type="button"
              disabled={ buttonDisabled }
              onClick={ (event) => this.pesquisar(artist, event) }
            >
              <BsSearch />
            </button>

          </div>
        )}
        {
          mostraResultado ? (
            <div>

              <AlbumsCard
                resultadoApi={ resultadoApi }
                artista={ artistResultado }
              />
            </div>) : ''

        }
        ;
      </>
    );
  }
}

export default Search;
