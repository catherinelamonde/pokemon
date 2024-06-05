export interface PokemonType {
  type: {
    name: string;
  };
}

export interface PokemonResponse {
  types: PokemonType[];
}
