import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Carregando from './carregando';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import '../style/musicCard.css';

class MusicCard extends Component {
  constructor() {
    super();

    this.state = {
      dataMusics: [],
      isFavorite: [],
      loading: false,
    };
  }

  async componentDidMount() {
    const { data } = this.props;
    const dataMusic = data.filter((ind, index) => index !== 0);
    this.setState({ dataMusics: dataMusic });
    this.setState({ loading: true }, async () => {
      const favorite = await getFavoriteSongs();
      this.setState({ isFavorite: favorite });
      this.setState({ loading: false });
    });
  }

  favoriteMusic = async (element) => {
    const { isFavorite } = this.state;
    const result = isFavorite.some((item) => item.trackId === element.trackId);
    if (result === false) {
      this.setState({ loading: true }, async () => {
        await addSong(element);
        isFavorite.push(element);
        this.setState({ loading: false, isFavorite });
      });
    } else {
      this.setState({ loading: true }, async () => {
        const removido = isFavorite.filter((item1) => item1.trackId !== element.trackId);
        await removeSong(element);
        isFavorite.push(element);
        this.setState({ loading: false, isFavorite: removido });
      });
    }
  }

  render() {
    const { dataMusics, loading, isFavorite } = this.state;
    return (
      <div>
        {loading ? <Carregando /> : (
          dataMusics.map((element) => (
            <div className="music" key={ element.id }>
              <p className="musicName">{element.trackName}</p>
              <audio data-testid="audio-component" src={ element.previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                {' '}
                {' '}
                <code>audio</code>
              </audio>
              <label className="favorito" htmlFor="checkbox">
                Favorito
                <input
                  className="check"
                  type="checkbox"
                  data-testid={ `checkbox-music-${element.trackId}` }
                  checked={ isFavorite.some((item) => item.trackId === element.trackId) }
                  onChange={ () => this.favoriteMusic(element) }
                />
              </label>
            </div>
          ))
        )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  data: PropTypes.arrayOf.isRequired,
};

export default MusicCard;
