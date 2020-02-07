import React, { Component } from 'react';
import { capitalize } from 'lodash';
import './PokemonSearch.css';

type Props = {
  userName?: string;
  numberOfPokemons?: number;
};

type State = {
  loading: boolean;
  inputValue: string;
  error: boolean;
  pokemon: Pokemon | null;
  pokemons: [];
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
    pokemon: null,
    pokemons: []
  };

  componentDidMount() {
    // fetch(`https://pokeapi.co/api/v2/pokemon/`)
    //   .then(response => response.json())
    //   .then(data => console.log(data.results));
  }

  handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ inputValue: ev.target.value });
  };

  handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    const { inputValue } = this.state;

    if (!inputValue) return;

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
            <h3>Nothing found…</h3>
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
                <div className="card">
                  <h2>{capitalize(pokemon.name)}</h2>
                  <figure>
                    <img src={pokemon.imageUrl} alt="" />
                    <figcaption>
                      <div className="statistic">
                        <div className="statistic-title">Base experience</div>
                        <div className="statistic-content">
                          {pokemon.baseExperience}
                        </div>
                      </div>
                    </figcaption>
                  </figure>
                </div>
              )}
            </div>
          )}
        </div>
      );
    };

    return (
      <div className="pokemon-search">
        <h1>Pokemon API search</h1>
        <p>
          {userName && numberOfPokemons && (
            <span>
              <span>User {userName} </span>
              <span>has {numberOfPokemons} pokemons</span>
            </span>
          )}
        </p>

        <form onSubmit={this.handleSubmit} className="form">
          <input
            type="text"
            className="text-input"
            value={inputValue}
            onChange={this.handleChange}
            placeholder="Enter pokemon name…"
          />
          <button type="submit" className="button">
            Search
          </button>
        </form>

        {renderResult()}
      </div>
    );
  }
}

export default PokemonSearch;
