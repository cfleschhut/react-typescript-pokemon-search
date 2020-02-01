import React, { Component } from 'react';

type Props = {
  userName: string;
  numberOfPokemons?: number;
};

type State = {
  loading: boolean;
  inputValue: string;
  error: boolean;
  pokemon: Pokemon | null;
};

type Pokemon = {
  name: string;
  imageUrl: string;
  baseExperience: number;
};

class PokemonSearch extends Component<Props, State> {
  state: State = {
    loading: false,
    inputValue: '',
    error: false,
    pokemon: null
  };

  handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ inputValue: ev.target.value });
  };

  handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    const { inputValue } = this.state;

    this.setState({ loading: true, inputValue: '' });

    fetch(`https://pokeapi.co/api/v2/pokemon/${inputValue}`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          loading: false,
          error: false,
          pokemon: {
            name: data.name,
            imageUrl: data.sprites.front_default,
            baseExperience: data.base_experience
          }
        });
      })
      .catch(() => {
        this.setState({ loading: false, error: true });
      });
  };

  render() {
    const { userName, numberOfPokemons } = this.props;
    const { inputValue, loading, error, pokemon } = this.state;

    const renderResult = () => {
      if (error) {
        return (
          <div>
            <p>Nothing found</p>
          </div>
        );
      }

      return (
        <div>
          {loading ? (
            <p>Loading…</p>
          ) : (
            <div>
              {pokemon && (
                <div>
                  <h3>{pokemon.name}</h3>
                  <figure>
                    <img src={pokemon.imageUrl} alt="" />
                    <figcaption>{pokemon.baseExperience}</figcaption>
                  </figure>
                </div>
              )}
            </div>
          )}
        </div>
      );
    };

    return (
      <div>
        <p>
          User {userName}{' '}
          {numberOfPokemons && <span>has {numberOfPokemons} pokemons</span>}
        </p>
        <form onSubmit={this.handleSubmit}>
          <input type="text" value={inputValue} onChange={this.handleChange} />
          <button>Search</button>
        </form>

        {renderResult()}
      </div>
    );
  }
}

export default PokemonSearch;
