import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../style/albumCard.css';

class AlbumsCard extends Component {
  constructor() {
    super();

    this.state = {

    };
  }

  render() {
    const { resultadoApi, artista } = this.props;
    return (
      <section>
        <p className="result">
          Resultado de álbuns de:
          {' '}
          {artista}
        </p>
        {resultadoApi.length === 0 ? <p>Nenhum álbum foi encontrado</p> : (
          resultadoApi.map((albun) => (
            <div className="card" key={ albun.collectionName }>
              <p className="card-title">{albun.collectionName}</p>
              <img
                className="card-img-top"
                src={ albun.artworkUrl100.replace('100x100bb', '1000x1000bb') }
                alt={ albun.artistId }
              />
              <p className="card-text">{albun.artistId}</p>
              <p>{albun.releaseDate}</p>
              <Link
                data-testid={ `link-to-album-${albun.collectionId}` }
                to={ `/album/${albun.collectionId}` }
                className="card-link"
              >
                ir ao Album
              </Link>
            </div>
          )))}
      </section>
    );
  }
}

AlbumsCard.propTypes = {
  resultadoApi: PropTypes.arrayOf.isRequired,
  artista: PropTypes.string.isRequired,
};

export default AlbumsCard;
