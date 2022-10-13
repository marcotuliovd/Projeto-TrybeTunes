import React, { Component } from 'react';
import Header from '../components/Header';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Carregando from '../components/carregando';

class Favorites extends Component {
  constructor() {
    super();

    this.state = {
      isFavorite: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.setState({ loading: true }, async () => {
      const favorite = await getFavoriteSongs();
      this.setState({ isFavorite: favorite, loading: false });
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
    const { isFavorite, loading } = this.state;
    return (
      <>
        <div data-testid="page-favorites">
          <Header />
        </div>
        <div>
          {loading ? <Carregando /> : (
            isFavorite.map((element) => (
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
                    checked={ isFavorite.some((item) => (
                      item.trackId === element.trackId)) }
                    onChange={ () => this.favoriteMusic(element) }
                  />
                </label>
              </div>
            ))
          )}
        </div>

      </>
    );
  }
}

export default Favorites;
