export type PokemonTypeName = string;

export interface PokemonTypeInfos {
  type: {
    name: PokemonTypeName;
  };
}

export interface PokemonResponse {
  types: PokemonTypeInfos[];
}