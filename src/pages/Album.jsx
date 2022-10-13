import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Carregando from '../components/carregando';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import '../style/album.css';

class Album extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      data: [],
      infoAlbum: {},
    };
  }

  componentDidMount() {
    this.setState({ loading: true }, async () => {
      const { match: { params: { id } } } = this.props;
      const data = await getMusics(id);
      this.setState({ data, infoAlbum: data[0], loading: false });
    });
  }

  render() {
    const { loading, data, infoAlbum } = this.state;
    return (
      <div>
        {loading ? <Carregando /> : (
          <div>
            <div data-testid="page-album" />
            <Header />
            <div>
              <h3 className="name" data-testid="artist-name">{infoAlbum.artistName}</h3>
              <h4
                className="name"
                data-testid="album-name"
              >
                {infoAlbum.collectionName}

              </h4>
              <MusicCard
                data={ data }
              />
            </div>
          </div>
        ) }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
